import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import * as fs from 'fs';

@Injectable()
export class ReportService {
  async generateReport(): Promise<Buffer> {
    const doc = new PDFDocument();
    const chunks: Buffer[] = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => console.log('PDF gerado com sucesso!'));

    doc.fontSize(18).text('Relatório de Usuários', { align: 'center' });
    doc.moveDown();

    const users = [
      { nome: 'Pedro Castilhos', email: 'pedro@email.com' },
      { nome: 'Maria Silva', email: 'maria@email.com' },
    ];

    users.forEach((user, i) => {
      doc.fontSize(12).text(`${i + 1}. ${user.nome} - ${user.email}`);
    });

    doc.end();

    return new Promise<Buffer>((resolve) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }
}
