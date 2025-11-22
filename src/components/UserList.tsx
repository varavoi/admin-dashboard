import { observer } from "mobx-react-lite";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import userStore from "../stores/userStore";
import type { User } from "../types";
import { useState } from "react";
import UserFormModal from "./modals/UserFormModal";
import DeleteConfirmationModal from "./modals/DeleteConfirmationModal";
import SearchAndFilters from "./ui/SearchAndFilters";
import TableActions from "./ui/TableActions";
import UserTableRow from "./ui/UserTableRow";
import { useUserFilter } from "../hooks/useUsersFilter";
import EmptyState from "./ui/EmptyState";
import { useToast } from '../contexts/ToastContext';
const UserList = observer(() => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    roleFilter,
    setRoleFilter,
    filteredUsers,
  } = useUserFilter();

  const { showToast } = useToast();
  // Состояния для модальных окон
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsUserFormOpen(true);
  };
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsUserFormOpen(true);
  };
  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };
  const confirmDelete = () => {
    if (selectedUser) {
      userStore.removeUser(selectedUser.id);
      showToast("Пользователь успешно удален", "success");
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  const searchAndFiltersProps = {
    searchTerm,
    onSearchChange: setSearchTerm,
    statusFilter,
    onStatusFilterChange: setStatusFilter,
    roleFilter,
    onRoleFilterChange: setRoleFilter,
  };
  const tableActionsProps = {
    title: "Пользователи",
    count: filteredUsers.length,
    onAddClick: handleAddUser,
    addButtonText: "Добавить пользователя",
  };

  return (
    <Box>
      <TableActions {...tableActionsProps} />
      <SearchAndFilters {...searchAndFiltersProps} />

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: "calc(100vh - 300px)",
          overflow: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Дата регистрации</TableCell>

              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredUsers.length === 0 && <EmptyState searchTerm={searchTerm} />}
      {/* Модальные окна */}
      <UserFormModal
        open={isUserFormOpen}
        onClose={() => setIsUserFormOpen(false)}
        user={selectedUser}
      />
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        userName={selectedUser?.name || ""}
      />
    </Box>
  );
});
export default UserList;
