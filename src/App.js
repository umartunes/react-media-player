
import './App.css';
import React, { useState, useEffect, useRef } from 'react'

import StyledDropzone from './Dropzone'

function App() {

	const audioPlayer = useRef(null)
	const [mediaFiles, setMediaFiles] = useState([])
	const [currentMediaFile, setCurrentMediaFile] = useState(false)
	const [mediaToPlay, setMediaToPlay] = useState(false)

	// Whenever we set a current Media File for playing
	useEffect(() => {

		// if no media file, then lets stop media playing
		if (!currentMediaFile) {
			setMediaToPlay(false)
			return
		}

		let fileToPlay = window.URL.createObjectURL(currentMediaFile)
		setMediaToPlay(fileToPlay)

		setTimeout(() => {
			audioPlayer.current.play()
		}, 500)

	}, [currentMediaFile])

	// Whenever we receive new media files
	useEffect(() => {

		if (!mediaFiles.length) {
			setCurrentMediaFile(false)
			return
		}

		// set the first file to play
		setCurrentMediaFile(mediaFiles[0])

	}, [mediaFiles])

	// Play next media file automatically when this audio ends
	let onMediaEnded = () => {

		let indexOfCurrentMedia = mediaFiles.indexOf(currentMediaFile)
		let isLastMediaFile = (mediaFiles.length - 1) === indexOfCurrentMedia

		if (isLastMediaFile) {
			console.log("All media files played. This was the last media file")
		} else {
			setCurrentMediaFile(mediaFiles[indexOfCurrentMedia + 1])
		}

	}

	return (
		<div className="App d-flex flex-column bg-dark">
			<header></header>
			<main className="flex-grow-1 d-flex align-items-center text-white">
				<div className="container">
					<div className="row">
						<h1 className="text-center mb-4 font-titanOne">React Media Player</h1>
					</div>
					<div className="row">
						<div className="col">
							<div className="media-player border border-2 border-secondary rounded-3 mx-auto " style={{ height: 300, maxWidth: 550 }}>
								<div className="d-flex flex-column h-100">

									<div className="flex-grow-1 d-flex flex-column text-white" style={{ height: '0%' }}>
										{mediaFiles.length
											? <aside className=" flex-grow-1 p-3" style={{ overflow: 'hidden', overflowY: 'auto' }}>
												<div className="row">
													<div className="col">
														<h4>Playlist:</h4>
													</div>
													<div className="col">
														<p className="text-end mb-0">
															<button className="btn btn-sm btn-danger" onClick={() => {
																setMediaFiles([])
															}}>
																<span className='fas fa-times me-1'></span>
																<span>Clear</span>
															</button>
														</p>
													</div>
												</div>

												{mediaFiles.map(file => {
													return <p key={file.path} className={`text-truncate cursor-pointer mb-1 ${file === currentMediaFile ? "text-info fw-bold" : ""}`} onClick={() => { setCurrentMediaFile(file) }}>
														<span className={`fas me-2 ${file !== currentMediaFile ? "fa-file" : "fa-play"}`}></span>
														{file.path}
														{/* - {file.size} <span>bytes</span> */}
													</p>
												})}
											</aside>
											: <StyledDropzone setMediaFiles={setMediaFiles} />
										}

									</div>
									<div className="p-2" style={{ background: 'rgba(255,255,255, 0.05)', height: 70 }}>
										<audio className="w-100" ref={audioPlayer} src={mediaToPlay ? mediaToPlay : "false"} autoPlay={false} loop={false} controls onEnded={() => { onMediaEnded() }}></audio>
									</div>
								</div>
							</div>
						</div>

					</div>

					<div>
						<p className="text-center mt-4 mb-2">&copy; {new Date().getFullYear()} React Media Player, Made with <span style={{ color: 'red' }}>❤</span> by <a className="text-white" href="https://techna.pk">Techna</a>.</p>
					</div>
				</div>
			</main>
			<footer></footer>
		</div>
	);
}

export default App;
