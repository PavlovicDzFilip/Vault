import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import hljs from 'highlight.js';

const initializeEditor = () => {
  Quill.register('modules/syntax', {
    highlight: (text: string) => hljs.highlightAuto(text).value,
  });

  console.log(Quill);
};

export { initializeEditor };
