import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
// #1 import quill-image-uploader
import ImageUploader from "quill-image-uploader";
import "react-quill/dist/quill.snow.css";
import { generateImageUrl } from "../../../ultils/helper";
import axios from "../../../ultils/axios";
import { API_UPLOAD_IMAGE } from "../../../constants/api";
// #2 register module
Quill.register("modules/imageUploader", ImageUploader);

class Editor extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { editorHtml: "" };
    this.handleChange = this.handleChange.bind(this);
    this.textInput = React.createRef();
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps?.defaultValue !== this.props.defaultValue) {
      console.log(nextProps);
      this.setState({ ...this.state, editorHtml: nextProps?.defaultValue });
    }
  };

  handleChange(html) {
    this.setState({ editorHtml: html });
    this.props.handleChange(html);
  }

  handleSubmit() {
    const editor = this.reactQuillRef.getEditor();
    this.setState({
      editorHtml: editor,
    });
  }
  modules = {
    // #3 Add "image" to the toolbar
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
    // # 4 Add module and upload function
    imageUploader: {
      upload: (file) => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("file", file);
          axios({
            method: "post",
            url: API_UPLOAD_IMAGE,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          }).then((res) => {
            console.log(res);
            if (res?.data?.statusCode != 200) {
              reject("Upload failed");
              alert("Upload error");
              return;
            }
            resolve(generateImageUrl(res?.data?.data?.src));
          });
        });
      },
    },
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "imageBlot", // #5 Optinal if using custom formats
  ];

  render() {
    return (
      <>
        <ReactQuill
          onChange={this.handleChange}
          theme="snow"
          style={{
            minHeight: "25vh",
          }}
          modules={this.modules}
          formats={this.formats}
          value={this.state.editorHtml}
        />
      </>
    );
  }
}

export default Editor;
