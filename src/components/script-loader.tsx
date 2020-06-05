import * as React from "react"

export interface ScriptLoaderProps {
	initScript?: ()=>void;
	children: React.ReactElement< {}, 'script' >;
}

export class ScriptLoader extends React.Component< ScriptLoaderProps > {
	componentDidMount() {
    const { children, initScript } = this.props

		const id = "id-" + children.props.src
		if ( document.getElementById( id ) ) {
			if ( initScript ) initScript()
			return
		}
		const bodyElement = document.getElementsByTagName( 'body' )[0];
		const scriptElement = document.createElement( 'script' )

		Object.keys( children.props ).forEach( 
			key => scriptElement.setAttribute( key, children.props[key] )
		)

		scriptElement.id = id;

		// if ( window ) {
		//   window.onload = ()=> bodyElement.append( scriptElement )
		// }
		bodyElement.append( scriptElement )
	}

	render() {
		return ( <></> )
	}
}