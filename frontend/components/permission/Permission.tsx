import React, { Dispatch, SetStateAction } from 'react';
import PermissionDTO from '../../lib/types/dto/permission/permissionDTO';
import useDisplayForm from '../common/hook/DisplayFormHook';

type PermissionProps = {
    permission: PermissionDTO;
    setPermission: Dispatch<SetStateAction<PermissionDTO>>;
    currentPermission: PermissionDTO;
};

export default function PermissionDetail({ permission, setPermission, currentPermission }: PermissionProps) {
    const { displayFormUpdate } = useDisplayForm();

    return (
        <tr>
            <td>
                <input
                    type="radio"
                    value={permission.ID}
                    name="check"
                    onChange={() => setPermission(permission)}
                    onClick={displayFormUpdate}
                    checked={permission.ID === currentPermission.ID}
                />
            </td>
            <td>{permission.username}</td>
            <td>{permission.app_name}</td>
            <td>{permission.display_name}</td>
            <td>{permission.role}</td>
        </tr>
    );
}
