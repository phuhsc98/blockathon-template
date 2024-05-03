import { ReactNode } from 'react';
import { default as CustomParagraph } from './paragraph';
import { styledComponent } from '../../../styled/styled';

export interface ParagraphProps {
  children?: ReactNode;
}

const StyledParagraph = styledComponent(CustomParagraph)``;

export function Paragraph({ children }: ParagraphProps) {
  return <StyledParagraph>{children || 'Paragraph'}</StyledParagraph>;
}

export default Paragraph;
