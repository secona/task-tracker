import { SendMailOptions } from 'nodemailer';
import matter from 'gray-matter';
import handlebars, { TemplateDelegate } from 'handlebars';
import path from 'path';

interface Template<N extends string, P extends object> {
  templateName: N;
  props: P;
}

type TemplateContext =
  | Template<'email-verification', { name: string; url: string }>
  | Template<'forgot-password', { name: string; url: string }>;

export type SendTemplateOptions = SendMailOptions & TemplateContext;

interface TemplateExtract {
  passProps: TemplateDelegate;
  data: {
    subject: string;
  };
}

const templateNames = [
  'email-verification',
  'forgot-password',
];

export function getTemplates() {
  const templates: Record<string, TemplateExtract> = {};

  templateNames.forEach(name => {
    const filePath = path.join(__dirname, `./templates/${name}.hbs`);
    const source = matter.read(filePath);
    templates[name] = {
      passProps: handlebars.compile(source.content),
      data: source.data as TemplateExtract['data'],
    };
  });

  return templates;
}
