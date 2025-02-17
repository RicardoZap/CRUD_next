import { deleteUser } from "@/actions/delete-user"
import { Enterprise, User } from "@prisma/client"
import { create } from "zustand"

interface DialogState {
    isOpen: boolean
    user: User | null
    openDialog: () => void
    closeDialog: () => void
    isEditUser: (data: User, open: boolean) => void
    userToEdit: User | null
    userUpdated: boolean
    setUserUpdated: (updated: boolean) => void
    deleteUser: (id: number) => void
    userCreated: boolean
    setUserCreated: (created: boolean) => void
}

interface UserStore {
    users: User[]
    setUsers: (users: User[]) => void
    removeUser: (id: number) => void
}

interface EnterpriseStore {
    enterprises: Enterprise[]
    setEnterprises: (enterprise: Enterprise[]) => void
}

export const useDialogStore = create<DialogState>((set) => ({
    isOpen: false,
    userToEdit: null,
    user: null,
    openDialog: () => set({ isOpen: true, userToEdit: null }),
    closeDialog: () => set({ isOpen: false, user: null }),
    isEditUser: (data, open) =>
        set({ isOpen: open, userToEdit: data }),
    userUpdated: false,
    setUserUpdated: (updated) => set({ userUpdated: updated }),
    deleteUser: (id) =>
        set({}),
    userCreated: false,
    setUserCreated: (created) => set({ userCreated: created})
}))

export const useUserStore = create<UserStore>((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
    removeUser: async (id: number) => {
        try {
            await deleteUser(id)
            set((state) => ({
                users: state.users.filter((user) => user.id !== id),
                isDelete: true
            }))
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    },
}));

export const useEnterpriseStore = create<EnterpriseStore>((set) => ({
    enterprises: [],
    setEnterprises: (enterprises) => set({ enterprises})
}))