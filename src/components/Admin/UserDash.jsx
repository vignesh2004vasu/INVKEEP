import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AddUserDialog } from "@/components/AddUserDialog"; // Adjust import path
import { axiosInstance } from "@/services/api";

const UserDash = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users");
        setUsers(response.data);
      } catch (error) {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSaveUser = async (user) => {
    try {
      const response = await axios.post(
        "https://in-telli-ventory.onrender.com/users",
        user
      );
      setUsers([...users, response.data]);
    } catch (error) {
      setError("Failed to add user.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://in-telli-ventory.onrender.com/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      setError("Failed to delete user.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <AddUserDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveUser}
      />
      <Button onClick={() => setIsDialogOpen(true)} variant="outline">
        Add User
      </Button>
      <Table className="mt-16 text-xl">
        <TableCaption>User List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default UserDash;
