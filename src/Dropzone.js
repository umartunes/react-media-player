
import './App.css';
import React, { useEffect, useMemo } from 'react'
import { useDropzone } from 'react-dropzone';

const baseStyle = {
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '10px',
	borderWidth: 2,
	borderRadius: 2,
	borderColor: '#6C757D',
	borderStyle: 'dashed',
	backgroundColor: 'transparent',
	color: '#bdbdbd',
	outline: 'none',
	transition: 'border .24s ease-in-out'
};

const activeStyle = {
	borderColor: '#2196f3'
};

const acceptStyle = {
	borderColor: '#00e676'
};

const rejectStyle = {
	borderColor: '#ff1744'
};

function StyledDropzone({ setMediaFiles }) {

	const {
		acceptedFiles,
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject
	} = useDropzone({ accept: 'audio/*, video/*' });

	const style = useMemo(() => ({
		...baseStyle,
		...(isDragActive ? activeStyle : {}),
		...(isDragAccept ? acceptStyle : {}),
		...(isDragReject ? rejectStyle : {})
	}), [
		isDragActive,
		isDragReject,
		isDragAccept
	]);

	// Whenever we upload some new files, setMediaFiles for parent component
	useEffect(() => {

		if (!acceptedFiles.length) {
			setMediaFiles([])
			return
		}

		setMediaFiles([...acceptedFiles])

	}, [acceptedFiles, setMediaFiles])

	return <div {...getRootProps({ style })}>
		<input {...getInputProps()} />
		<p className="mb-0 font-titanOne">Drag 'n' drop media files here, or click to select files</p>
	</div>
}

export default StyledDropzone