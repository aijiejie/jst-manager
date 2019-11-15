import ajax from "./ajax";

export const getCategoryWithParentID = (parent_id=0) => ajax("api/get_category", {parent_id});

export const deleteCategoryWithID = (id) => ajax("api/delete_category", {id});

export const addCategory = (category_name, parent_id) => ajax("api/add_category", {category_name, parent_id}, "post");

export const updateCategory = (id, category_name, parent_id) => ajax("api/update_category", {id, category_name, parent_id}, "post");
