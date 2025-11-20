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
  Typography,
} from "@mui/material";
import userStore from "../stores/userStore";
import type { User } from "../types";
import { useState } from "react";
import UserFormModal from "./UserFormModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import SearchAndFilters from "./SearchAndFilters";
import TableActions from "./TableActions";
import UserTableRow from "./UserTableRow";

const UserList = observer(() => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [roleFilter, setRoleFilter] = useState("all");

  // Состояния для модальных окон
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = userStore.users.filter((user: User) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });
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
      userStore.deleteUser(selectedUser.id);
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  const handleSearchChange = (value: string): void => {
    setSearchTerm(value);
  };
  const handleStatusChange = (value: "all" | "active" | "inactive"): void => {
    setStatusFilter(value);
  };
  const handleRoleChange = (value: string): void => {
    setRoleFilter(value);
  };

  const searchAndFiltersProps = {
    searchTerm,
    onSearchChange: handleSearchChange,
    statusFilter,
    onStatusFilterChange: handleStatusChange,
    roleFilter,
    onRoleFilterChange: handleRoleChange,
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Дата регистрации</TableCell>
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

      {filteredUsers.length === 0 && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography color="textSecondary">Пользователи не найдены</Typography>
        </Box>
      )}
      {/* Модальные окна */}
      <UserFormModal
        open={isUserFormOpen}
        onClose={() => setIsUserFormOpen(false)}
        userId={selectedUser?.id}
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
