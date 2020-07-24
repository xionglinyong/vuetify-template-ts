import { APIS } from '../types/api'
import { RequestMethod } from '@/types/enum'
import { UserInput, UserQuery } from '../types/user'

const axios = window.axios
const urlHead = '/api/User'
const apis: APIS = {
  enumGender: {
    url: `${urlHead}/EnumGender`,
    method: RequestMethod.get
  },
  enumUserStatus: {
    url: `${urlHead}/EnumUserStatus`,
    method: RequestMethod.get
  },
  getUserList: {
    url: `${urlHead}/GetList`,
    method: RequestMethod.get
  },
  getUser: {
    url: `${urlHead}/Get`,
    method: RequestMethod.get
  },
  editUser: {
    url: `${urlHead}/Edit`,
    method: RequestMethod.put
  },
  addUser: {
    url: `${urlHead}/Add`,
    method: RequestMethod.post
  },
  removeUser: {
    url: `${urlHead}/Remove`,
    method: RequestMethod.delete
  },
  deleteUser: {
    url: `${urlHead}/Delete`,
    method: RequestMethod.delete
  },
  addUserToRole: {
    url: `${urlHead}/AddUserToRole`,
    method: RequestMethod.post
  },
  getUserRoles: {
    url: `${urlHead}/GetUserRoles`,
    method: RequestMethod.get
  },
  removeUserFromRole: {
    url: `${urlHead}/RemoveUserFromRole`,
    method: RequestMethod.delete
  },
  setUserStatus: {
    url: `${urlHead}/SetUserStatus`,
    method: RequestMethod.put
  },
  restPassWord: {
    url: `${urlHead}/ResetPassWord`,
    method: RequestMethod.put
  }
}

export async function enumGender () {
  return axios({
    url: apis.enumGender.url,
    method: apis.enumGender.method
  })
}

export async function enumUserStatus () {
  return axios({
    url: apis.enumUserStatus.url,
    method: apis.enumUserStatus.method
  })
}

export async function getUserList (params: UserQuery) {
  return axios({
    url: apis.getUserList.url,
    method: apis.getUserList.method,
    params
  })
}

export async function getUser (id: string) {
  return axios({
    url: apis.getUser.url,
    method: apis.getUser.method,
    params: {
      id
    }
  })
}

export async function editUser (data: UserInput) {
  return axios({
    url: apis.editUser.url,
    method: apis.editUser.method,
    data
  })
}

export async function addUser (data: UserInput) {
  return axios({
    url: apis.addUser.url,
    method: apis.addUser.method,
    data
  })
}

export async function removeUser (id: string) {
  return axios({
    url: apis.removeUser.url,
    method: apis.removeUser.method,
    params: {
      id
    }
  })
}

export async function deleteUser (id: string) {
  return axios({
    url: apis.deleteUser.url,
    method: apis.deleteUser.method,
    params: {
      id
    }
  })
}

export async function addUserToRole (data: {userId: string;roleId: string}) {
  return axios({
    url: apis.addUserToRole.url,
    method: apis.addUserToRole.method,
    data
  })
}

export async function removeUserFromRole (params: {UserId: string;RoleId: string}) {
  return axios({
    url: apis.removeUserFromRole.url,
    method: apis.removeUserFromRole.method,
    params
  })
}

export async function getUserRoles (userId: string) {
  return axios({
    url: apis.getUserRoles.url,
    method: apis.getUserRoles.method,
    params: {
      userId
    }
  })
}

export async function setUserStatus (data: {userId: string;status: number}) {
  return axios({
    url: apis.setUserStatus.url,
    method: apis.setUserStatus.method,
    data
  })
}

export async function restPassWord (params: {UserName: string;PassWord: string;NewPassWord: string}) {
  return axios({
    url: apis.restPassWord.url,
    method: apis.restPassWord.method,
    params
  })
}
