import {Component} from "react";
import React from "react";
import {DropzoneArea} from "material-ui-dropzone";
import {
    TheatersRounded,
    ImageRounded,
    AttachFileRounded,
    InsertDriveFileRounded,
} from "@material-ui/icons";
import "../UploadFile/DragAndDropFile.css";
import "./SharedSpace.css"
import Button from "react-bootstrap/Button";
import {CardContent} from "@material-ui/core";
import {Card} from "react-bootstrap";
import axios from "axios";

export default class DragAndDropFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            dataL: [],
            courseId: window.location.toString().substring(window.location.toString().indexOf("sid=") + 4),
            loading: false,
        };
        this.getData();
    }

    downloadFile = async (filename) => {
        console.log(filename)
        const response = await axios.get(
            "http://localhost:8082/course/file/download-file/" + filename
        );
        console.log(response)
    }

    getData = () => {
        axios.get(
            "http://localhost:8082/course/files/" + this.state.courseId + "/shared"
        ).then((response) => {
            this.getFiles(response.data)
            this.setState({
                loading: false,
            });
        });
    }

    getFiles = (data) => {
        for (let i = 0; i < data.length; i++) {
            let filename = data[i].fileName;
            this.state.dataL.push(filename);
        }

        console.log(this.state.dataL)
    }

    renderFiles = (file) => {
        return (
            <div className={"files"} style={{border: "1px solid black", padding: "30px"}}>
                <Button onClick={() => this.downloadFile(file)}>{file}</Button>
            </div>
        )
    }


    handleChange = (files) => {
        this.setState({
            files: files,
        });
    };

    handleUploadButton = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        for (const file of this.state.files) {
            formData.append("files", file);
        }
        console.log(this.state.files[0]);

        const url = "http://localhost:8082/course/file/upload-file/" + (window.location.toString().substring(window.location.toString().indexOf("sid=") + 4)) + "/shared";
        console.log(url)
        const response = await axios({
            method: 'post',
            url: url,
            data: formData,
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        })
        console.log(response);
    };

    render() {
        return (
            <div id={'wrapper-div'}>
                <Card id={"card"}>
                    <CardContent id={"card-content"}>
                        <div id={"wrapper"}>
                            <div id={"dropzone"}>
                                <DropzoneArea
                                    className={"DropzoneArea"}
                                    acceptedFiles={["image/*", "video/*", "application/*"]}
                                    onChange={this.handleChange.bind(this)}
                                    showFileNames
                                    maxFileSize={5000000000}
                                    dropzoneText="Upload files here"
                                    filesLimit={20}
                                    multiline
                                    maxRows={1}
                                    getPreviewIcon={(fileObject, classes) => {
                                        const {type} = fileObject.file;
                                        const iconProps = {
                                            className: classes.image,
                                        };

                                        if (type.startsWith("video/"))
                                            return <TheatersRounded {...iconProps} />;
                                        if (type.startsWith("image/"))
                                            return <ImageRounded {...iconProps} />;
                                        if (type.startsWith("application/"))
                                            return <InsertDriveFileRounded {...iconProps} />;
                                        else return <AttachFileRounded {...iconProps} />;
                                    }}
                                />
                            </div>
                            <label htmlFor={"dropzone"} id={"dropzone-label"}>
                                Accepted files: word, power-point, image, video
                            </label>
                            <Button
                                id={"upload-button"}
                                onClick={this.handleUploadButton}
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Finish
                            </Button>
                        </div>
                        <h1>
                            Students Shared Space for Course {this.state.courseId}
                        </h1>
                        <div>
                            {this.state.dataL.map(this.renderFiles)}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
}
