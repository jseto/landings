import * as React from 'react'

interface ColumnsProps {
	verticalCenter?: boolean;
	align?: 'left' | 'right' | 'center';
	colSizes?: string[];
	children: React.ReactChildren;
}

export const Columns = ({ 
	children, 
	verticalCenter, 
	align, 
	colSizes }: ColumnsProps
) => {

	return (
		<div 
			className={ `columns is-multiline ${ verticalCenter && 'is-vcentered' }` }
			style={{ textAlign: align? align : 'left' }}
		>
			{
				React.Children.map( children, ( child, idx ) => (
					<div className={
						`column ${ (colSizes && colSizes[ idx])? colSizes[ idx]:'' }`
					}>
						{ child }
					</div>
				))
			}
		</div>
	)
}