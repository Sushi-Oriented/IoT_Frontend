import { IRequest, SERVER } from '../api';

export const profileActions = {
    changePassword,
    resetPassword,
    resetPasswordByAdmin
};

function changePassword(oldpassword, newpassword) {
    let _param = {
        oldPassword: oldpassword,
        newPassword: newpassword
    }
    return IRequest.Post(SERVER.API.ChangePassword, _param)
}
function resetPassword(id, newPassword) {
    return IRequest.Patch(SERVER.API.ResetPassword + '/' + id, { password: newPassword })
}
function resetPasswordByAdmin(id, newPassword) {
    return IRequest.Post(SERVER.API.resetPasswordByAdmin, { id: id, newPassword: newPassword })
}