import React from 'react';

const Codes = ({ data }) => {
  // const codeMirrorRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const CodeMirror = require('codemirror');
  //   const instance = CodeMirror.fromTextArea(codeMirrorRef.current, {
  //     lineNumbers: false,
  //     lineWrapping: true,
  //     mode: "javascript",
  //     theme: "material"
  //   });
  //   instance.setSize("100%", "100%");
  // }, []);

  return (
    <div>
      {/* <textarea ref={codeMirrorRef}>{data}</textarea>; */}
    </div>
  );
};
export default Codes;
