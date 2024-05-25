import { ApiConfig } from "./apiConfig";
import commonApiFunction from "./commonApiFunction";

export const createUserApi=(payload:any)=>{
    const url = `${ApiConfig.BASE_URL}${ApiConfig.REGISTER_USER}`;
   return commonApiFunction("post", url,null, payload);
}

export const loginUserApi=(payload:any)=>{
    const url = `${ApiConfig.BASE_URL}${ApiConfig.LOGIN}`;
   return commonApiFunction("post", url,null, payload);
}
export const addCategoryApi = ({payload, accessToken}:any)=>{
    const url = `${ApiConfig.BASE_URL}${ApiConfig.ADDCATEGORY}`;
    return commonApiFunction("post", url,accessToken,payload);
}

export const getAllCategoryListApi =(accessToken:any)=>{
    const url = `${ApiConfig.BASE_URL}${ApiConfig.GET_ALL_CATEGORY}`;
    return commonApiFunction("get", url,accessToken);
}

export const addSubCategoryApi=({payload,accessToken}:any)=>{
    const url = `${ApiConfig.BASE_URL}${ApiConfig.ADD_SUB_CATEGORY}`;
    return commonApiFunction("post", url,accessToken,payload)
}
export const getSpecificSubcategoriesListApi=({payload,accessToken}:any)=>{
    const url = `${ApiConfig.BASE_URL}${ApiConfig.GET_SPECIFIC_SUBCATEGORYLIST}`;
    return commonApiFunction("post", url,accessToken,payload);
}
export const addProductApi=({payload,accessToken}:any)=>{
    const url = `${ApiConfig.BASE_URL}${ApiConfig.CREATE_PRODUCT}`;
    return commonApiFunction("post", url,accessToken,payload);
}
export const getProductListApi =({payload,accessToken}:any)=>{
    const url = `${ApiConfig.BASE_URL}${ApiConfig.GET_PRODUCT_LIST}`;
    return commonApiFunction("post", url,accessToken,payload);
}
export const deleteCategoryApi =({accessToken,id}:any)=>{
    const url = `${ApiConfig.BASE_URL}${ApiConfig.DELETE_CATEGORY}`+`${id}`;
    return commonApiFunction("delete", url,accessToken);
}
export const deleteSubCategoryApi =({accessToken,id}:any)=>{
    const url = `${ApiConfig.BASE_URL}${ApiConfig.DELETE_SUBCATEGORY}`+`${id}`;
    return commonApiFunction("delete", url,accessToken);
}
export const deleteProductApi =({accessToken,id}:any)=>{
    const url = `${ApiConfig.BASE_URL}${ApiConfig.DELETE_PRODUCT}`+`${id}`;
    return commonApiFunction("delete", url,accessToken);
}
export const editCategoryApi =({accessToken,payload}:any)=>{
    const url = `${ApiConfig.BASE_URL}${ApiConfig.DELETE_CATEGORY}`;
    return commonApiFunction("put", url,accessToken,payload);
}
export const editSubCategoryApi =({accessToken,payload}:any)=>{
    const url = `${ApiConfig.BASE_URL}${ApiConfig.DELETE_SUBCATEGORY}`;
    return commonApiFunction("put", url,accessToken,payload);
}