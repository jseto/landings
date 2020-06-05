import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby';
import { EntryGrid, EntryGridItem } from '../components/entry-grid';
import { CategoryEntriesQuery } from '../../graphql-types';
import { EntryCard } from '../components/entry-card';
import { MarkdownBlock } from './markdown-block';

export interface CategoryEntriesProps {
	className?: string;
	category: string;
	readMoreLabel?: string;
	tags?: string; // comma separated
	asMarkdown?: boolean;
	spareGrid?: boolean;
	children?: ( item: EntryGridItem ) => React.ReactElement;
}

export const CategoryEntries = ( props: CategoryEntriesProps ) => (
	<StaticQuery
		query={graphql`
			query CategoryEntries {
				allMdx(sort: {fields: frontmatter___order, order: ASC}) {
					nodes {
						frontmatter {
							title
							description
							className
							order
							category
							tags
						}
						id
						excerpt
						tableOfContents
						body
						fields {
							slug
							featuredImage
						}
					}
				}
			}
  	`}
		render={
			( data: CategoryEntriesQuery ) => {
				
				const nodes = data.allMdx.nodes.filter( node => 
					node.frontmatter.category === props.category 
								&& hasTags( node.frontmatter.tags, props.tags )
				)

				return (
					<>
						<EntryGrid
							items={ nodes }
							compact={ !props.spareGrid }
							{...props}
							>
							{
								item => {
									const { children, asMarkdown } = props
									
									if ( children ) {
										return(
											children( item )
										)
									}
									else if ( asMarkdown ) {
										return(
											<MarkdownBlock className={ item.frontmatter.className }>
												{ item.body }
											</MarkdownBlock>
										)
									}
									else{
										return (
											<EntryCard
												heading={ item.frontmatter.title }
												excerpt={ item.frontmatter.description || item.excerpt }
												imagePath={ item.fields.featuredImage }
												slug={ item.fields.slug }
												readMoreLabel={ props.readMoreLabel }
											/>
										)
									}
								}
							}

						</EntryGrid>
					</>
				)
			}
		}
	/>
);

function hasTags( tags: string[], targetTags: string | string[] ) {
	if ( !targetTags ) return true;
	return tags.filter( tag => targetTags.includes( tag ) ).length
}