/** @format */

import React, { useState } from "react";
import filterBoxStyle from "../../assets/css/components/filterBox.module.css";
import { useSelector } from "react-redux";
export default function FilterBox(props) {
	const tags = useSelector((state) => state.projects.tags);
	const [filters, SetFilters] = useState({});
	console.log(tags);

	const onSearch = (e) => {
		if (e.target.value === "") {
			props.resetToDefaultProjects();
		} else {
			let filtersCopy = filters;
			filtersCopy.Search = e.target.value;
			console.log(filtersCopy);
			SetFilters(filtersCopy);
			props.startFiltering(filtersCopy);
		}
	};

	const onTagChange = (e) => {
		let filtersCopy = filters;
		let tagFilters = filtersCopy.Tags || [];
		e.target.checked
			? tagFilters.push(e.target.value)
			: tagFilters.splice(tagFilters.indexOf(e.target.value), 1);
		filtersCopy.Tags = tagFilters;
		SetFilters(filtersCopy);
		if (filters.Tags.length > 0) {
			props.startFiltering(filtersCopy);
		} else {
			props.resetToDefaultProjects();
		}
	};
	const buildTags = () => {
		if (tags !== undefined) {
			return tags.map((tag, index) => {
				return (
					<div key={index} className={filterBoxStyle.tagBox}>
						<input
							id={tag}
							type="checkbox"
							value={tag}
							onChange={onTagChange}
							className={filterBoxStyle.tagCheckbox}
						/>
						<label htmlFor={tag} className={filterBoxStyle.tagLabel}>
							{tag}
						</label>
					</div>
				);
			});
		}
	};
	return (
		<div className={filterBoxStyle.filterWrapper}>
			<div className={filterBoxStyle.searchBox}>
				<input
					type="text"
					className={filterBoxStyle.searchBar}
					placeholder="Search for projects based on name"
					onChange={onSearch}
				/>
				<select onChange={props.onSort} className={filterBoxStyle.sortOptions}>
					<option value="name_ascending">Sort by name(Ascending)</option>
					<option value="name_descending">Sort by name(Descending)</option>
					<option value="date_ascending">Sort by start date(Ascending)</option>
					<option value="date_descending">
						Sort by start date(Descending)
					</option>
				</select>
			</div>
			<div className={filterBoxStyle.tagBox}>{buildTags()}</div>
		</div>
	);
}
