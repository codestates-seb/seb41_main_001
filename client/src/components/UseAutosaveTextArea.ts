import { useEffect } from 'react';

// Updates the height of a <textarea> when the value changes.
const UseAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string,
) => {
  useEffect(() => {
    if (textAreaRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = '0px';
      const { scrollHeight } = textAreaRef;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      if (scrollHeight > 260) {
        textAreaRef.style.height = '260px';
      } else {
        textAreaRef.style.height = `${scrollHeight}px`;
      }

      if (value.length === 0) {
        textAreaRef.style.height = '27px';
      }
    }
  }, [textAreaRef, value]);
};

export default UseAutosizeTextArea;
