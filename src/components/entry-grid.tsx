import * as React from 'react'
import { ReactNode } from 'react'
import { Mdx, MdxFrontmatter, MdxFields, Maybe, Scalars } from '../../graphql-types'

export type EntryGridItem = (Pick<Mdx, "id" | "excerpt" | "body"> & {
	frontmatter?: Pick<MdxFrontmatter, "title" | "description" | "className" | "order" | "category">;
	fields?: Pick<MdxFields, "slug" | "featuredImage">;
	tableOfContents?: Maybe<Scalars['JSON']>;
})

export interface EntryGridProps {
	items: EntryGridItem[];
	className?: string;
	compact: boolean;
	children: ( item: EntryGridItem ) => ReactNode;
}

export class EntryGrid extends React.Component<EntryGridProps> {

	render() {
		const { compact, className } = this.props

		return(
			<div className={ `columns is-multiline ${ className }` }>

				{ compact
					? this.renderCompactGrid()
					: this.renderSpareGrid()
				}

			</div>
		)
	}

	private renderSpareGrid() {
		const { items, children } = this.props

		return items.map( item => (
      <div key={ item.id } className="column">
				{ children( item ) }
      </div>
    ))
	}

	private renderCompactGrid() {
		const { items, children } = this.props
		const childrenElement = items.map( item => ({ id: item.id, elem: children( item ) }) )

		return (
		  <>
				<div className="column is-one-third">
					{ childrenElement.filter( ( _item, i ) => i % 3 === 0 ).map( elem => <div key={elem.id}>{elem.elem}</div> ) }
				</div>
				<div className="column is-one-third">
					{ childrenElement.filter( ( _item, i ) => i % 3 === 1 ).map( elem => <div key={elem.id}>{elem.elem}</div> ) }
				</div>
				<div className="column is-one-third">
					{ childrenElement.filter( ( _item, i ) => i % 3 === 2 ).map( elem => <div key={elem.id}>{elem.elem}</div> ) }
				</div>
		  </>
		)
	}
}
