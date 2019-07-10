import React from 'react';
import ReactHtmlParser from 'react-html-parser';

export default function ContentAgreement({ agreement }) {
	return (
		<div className="col-12 py-5 AgreementContent">
			<div className="wrap">
				<div className="agreementTitle">
					<h3 className="tit_layout_01">{agreement.title.rendered}</h3>
					{/* <span>{agreement.}</span> */}
				</div>
				<div className="agreementContent">
					<div className="agreementImage">
						<img
							src={agreement.images.large}
							alt={'Logotipo ' + agreement.title.rendered}
						/>
					</div>
					{ReactHtmlParser(agreement.content.rendered)}
				</div>
			</div>
		</div>
	);
}
