import { SetMetadata } from '@nestjs/common';

export const NIVEL_ACESSO_KEY = 'nivelAcesso';
export const NivelAcesso = (nivel: number) => SetMetadata(NIVEL_ACESSO_KEY, nivel);
