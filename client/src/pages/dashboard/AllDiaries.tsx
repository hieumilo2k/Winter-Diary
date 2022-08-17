import React, { useState } from 'react';
import ReactQuill, { Quill, Value } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const fontSizeArr = ['20px', '28px', '36px', '48px', '64px'];
let Size = Quill.import('attributors/style/size');
Size.whitelist = fontSizeArr;
Quill.register(Size, true);

const fontFamilyArr = ['Roboto Slab', 'Cabin', 'Lobster', 'Arial'];
let Font = Quill.import('attributors/style/font');
Font.whitelist = fontFamilyArr;
Quill.register(Font, true);

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ font: fontFamilyArr }],
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ align: [] }],
  ['image', 'blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

  [{ size: fontSizeArr }], // custom dropdown

  ['clean'], // remove formatting button
];
const AllDiaries = () => {
  const [value, setValue] = useState<Value>('Ngo');
  console.log(value);
  return (
    <div className='container'>
      <ReactQuill
        theme='snow'
        value={value}
        onChange={setValue}
        modules={{ toolbar: TOOLBAR_OPTIONS }}
      />
    </div>
  );
};

export default AllDiaries;
