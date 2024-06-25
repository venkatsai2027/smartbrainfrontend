import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit}) => {
	return (
		<div> 
			<p className = 'f2'>
				{"Paste your Image link here and click submit"}
			</p>
			<div>
				<div>
					<input className = 'br3 w-40 pa2 bg-light-blue' type = 'text' placeholder = 'Paste here' onChange = {onInputChange}/>
					<button className = 'br3 w-29 ph5 pa2 mh2 bg-hot-pink pointer grow link dim black' onClick = {onButtonSubmit} >Detect</button>
				</div>
			</div>
		</div>

	);
}

export default ImageLinkForm;