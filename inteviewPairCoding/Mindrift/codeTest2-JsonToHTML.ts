import * as fs from 'fs';
import { createWriteStream } from 'fs';

interface HTMLNode {
  text?: string;
  tag?: string;
  attributes?: Record<string, string>;
  children?: HTMLNode[];
}

const selfClosingTags = new Set(['img', 'input', 'br', 'hr', 'meta', 'link']);

function jsonToHTML(jsonString: string): string {
  const jsonObj: HTMLNode | HTMLNode[] = JSON.parse(jsonString);
  return buildHTMLWithJsonObj(jsonObj);
}


function buildHTMLWithJsonObj(jsonObj: HTMLNode | HTMLNode[]): string {

  if (Array.isArray(jsonObj)) {
    return jsonObj.map(node => buildHTMLWithJsonObj(node)).join('');
  }

  if (jsonObj.text) {
    return jsonObj.text;
  }

  const tag = jsonObj.tag!;
  const attributes = jsonObj.attributes || {};
  const children = jsonObj.children || [];

  const attrEntries = Object.entries(attributes);
  const attrString = attrEntries.map(([key, value]) => `${key}="${value}"`).join(' ');

  let startTag = `<${tag}`;
  if (attrString) {
    startTag += ` ${attrString}`;
  }
  startTag += '>';

  if (selfClosingTags.has(tag)) {
    return `${startTag.slice(0, -1)} />`;
  }

  const childrenHTML = children.map(child => buildHTMLWithJsonObj(child)).join('');
  const endTag = `</${tag}>`;

  return startTag + childrenHTML + endTag;
}


async function main() {
  const ws: fs.WriteStream = createWriteStream(process.env.OUTPUT_PATH!);
  const jsonString = inputString[0]; 
  const content = jsonToHTML(jsonString);

  ws.write(content);
  ws.end();
}

const inputString = ["{\"tag\":\"p\",\"attributes\":{\"id\":\"main\"},\"children\":[{\"text\":\"Hello,\"},{\"tag\":\"strong\",\"attributes\":{},\"children\":[{\"text\":\"world!\"}]},{\"tag\":\"div\",\"attributes\":{},\"children\":[]}]}"];

main().catch(console.error);