import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, regions }) => {
	return (
		<div className = 'center ma'>
			<div className = 'absolute mt2'>
				<img alt = '' src = {imageUrl} width = '500px' height = 'auto' />
				{regions.map((region,index) => {
					const {topRow,leftCol,bottomRow,rightCol} = region;
					return(
						<div key = {index} className = 'bounding-box' style = {{
							top: `${topRow * 100}%`,
			                left: `${leftCol * 100}%`,
			                bottom: `${100 - bottomRow * 100}%`,
			                right: `${100 - rightCol * 100}%`
						}}
						></div>
					);
				})}
			</div>
		</div>
	);
}


export default FaceRecognition;