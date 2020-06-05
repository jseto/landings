import * as React from "react";
let SpinnerIcon = require( "@fortawesome/fontawesome-free/svgs/solid/spinner.svg" );

export interface WaitingSpinnerProps {
	waiting: boolean;
	children: React.ReactElement;
}

export function WaitingSpinner( props: WaitingSpinnerProps ) {
	if ( props.waiting ) {
		return (
			<div className="waiting-spinner modal-container full">
				
				{ props.children }

				{ props.waiting &&

					<div className="modal lighter spin">
						<SpinnerIcon/>
					</div>
				
				}
			</div>
		)
	}
	else {
		return props.children
	}
}