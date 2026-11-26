// Coloca o botão "Ver no site" ao lado de "Salvar" no editor do Keystatic.
// O Keystatic só oferece o link escondido no menu "…", sem opção de configurar.
// Feito para @keystatic/core 0.6.10 (versão fixada no package.json): se a versão mudar,
// o script falha no build em vez de quebrar o painel em silêncio.
import { readFileSync, writeFileSync } from 'node:fs';

const file = 'node_modules/@keystatic/core/dist/keystatic-core-ui.js';
let src = readFileSync(file, 'utf8');

if (src.includes('"Ver no site"')) {
  console.log('patch-keystatic: já aplicado');
  process.exit(0);
}

const edits = [
  // Tira "Preview" do menu "…".
  [`    if (previewHref) {
      let t6;
      if ($[8] !== previewHref) {`, `    if (false) {
      let t6;
      if ($[8] !== previewHref) {`],
  [`function HeaderActions(props) {
  const $ = c(55);`, `function HeaderActions(props) {
  const $ = c(56);`],
  // Botão visível antes de "Salvar".
  [`  if ($[49] !== indicatorElement || $[50] !== t13 || $[51] !== t15 || $[52] !== t18 || $[53] !== t21) {
    t22 = /*#__PURE__*/jsxs(Flex, {
      alignItems: "center",
      gap: t7,
      children: [t8, indicatorElement, t13, t15, t18, t21]
    });`, `  if ($[49] !== indicatorElement || $[50] !== t13 || $[51] !== t15 || $[52] !== t18 || $[53] !== t21 || $[55] !== previewHref) {
    const previewButton = previewHref ? /*#__PURE__*/jsx(Button, {
      href: previewHref,
      target: "_blank",
      rel: "noopener noreferrer",
      prominence: "default",
      children: "Ver no site"
    }) : null;
    $[55] = previewHref;
    t22 = /*#__PURE__*/jsxs(Flex, {
      alignItems: "center",
      gap: t7,
      children: [t8, indicatorElement, t13, previewButton, t15, t18, t21]
    });`],
];

for (const [from, to] of edits) {
  if (src.split(from).length !== 2) {
    throw new Error('patch-keystatic: trecho não encontrado — a versão do @keystatic/core mudou?');
  }
  src = src.replace(from, to);
}
writeFileSync(file, src);
console.log('patch-keystatic: aplicado');
