import React from 'react';

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
		</div>
	);
}
