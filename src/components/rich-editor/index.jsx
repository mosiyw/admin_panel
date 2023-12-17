/* eslint-disable import/no-unresolved */
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import { useMemo } from "react";
import PropTypes from "prop-types";

function RichEditor({ onChange, value }) {
  const simpleMDEOptions = useMemo(
    () => ({
      autofocus: true,
      showIcons: ["undo"],
      hideIcons: ["fullscreen"],
      sideBySideFullscreen: false,
      inputStyle: "textarea",
    }),
    []
  );

  return <SimpleMDE options={simpleMDEOptions} value={value} onChange={onChange} />;
}

RichEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default RichEditor;
