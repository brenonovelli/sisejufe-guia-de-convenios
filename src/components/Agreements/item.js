import React from 'react';
import ReactHtmlParser from 'react-html-parser';

export default function ItemAgreement({ agreement }) {
	return (
		<div className="wrap">
			<div className="agreementImage">
				<img
					src={agreement.images.large}
					alt={'Logotipo ' + agreement.title.rendered}
				/>
			</div>
			<div className="agreementTitle">
				<strong>{agreement.title.rendered}</strong>
				{/* <span>{agreement.}</span> */}
			</div>
			{agreement.favorite && (
				<div className="agreementContent">
					{ReactHtmlParser(agreement.content.rendered)}
				</div>
			)}
		</div>
	);
}
