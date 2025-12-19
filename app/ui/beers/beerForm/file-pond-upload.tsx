"use client";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";
import { SetStateAction, Dispatch } from "react";

// Import the Image EXIF Orientation and Image Preview plugins
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Image Upload component
export function ImageUpload({
	files,
	setFiles,
}: {
	files: File[];
	setFiles: Dispatch<SetStateAction<File[]>>;
}) {
	return (
		<div className="flex flex-row place-items-center">
			<p className="flex-1/7 pl-2 pr-2 w-fit align-middle">Upload File</p>
			<div className="flex-5/7 mr-10 w-full h-full">
				<FilePond
					files={files}
					onupdatefiles={(fileItems) => {
						setFiles(fileItems.map((fileItem) => fileItem.file as File));
					}}
					allowMultiple={false}
					credits={false} // Turn of credits for now, sorry
					server={null} // Disable the auto upload because we wish to do it ourselves
					name="files" /* sets the file input name, it's filepond by default */
					// Its ugly but this is how to style the content within the dropzone
					labelIdle={`
                        <div class="flex flex-col">
                            <svg class="place-self-center" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-upload-icon lucide-cloud-upload"><path d="M12 13v8"/>
                                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="m8 17 4-4 4 4"/>
                            </svg>
                            <p>Drag and Drop or Click to browse<p>
                        </div>
                    `}
				/>
			</div>
		</div>
	);
}
