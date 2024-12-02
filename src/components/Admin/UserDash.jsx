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
import AddUserDialog  from "@/components/AddUserDialog";
import { axiosInstance } from "@/services/api";

const UserDash = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users");
        console.log(response.data);
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
    if (editingUser) {
      try {
        const response = await axiosInstance.put(
          `/users/${editingUser.uid}`, 
          user
        );
        setUsers(
          users.map((u) => (u.uid === editingUser.uid ? response.data : u)) 
        );
      } catch (error) {
        setError("Failed to edit user.");
      }
    } else {
      try {
        const response = await axiosInstance.post("/users", user);
        setUsers([...users, response.data]);
      } catch (error) {
        setError("Failed to add user.");
      }
    }

    setEditingUser(null);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleDelete = async (uid) => {
    if (!uid) {
      console.error("UID is undefined");
      return;
    }
    try {
      await axiosInstance.delete(`/users/${uid}`); // Use uid instead of id
      setUsers(users.filter((user) => user.uid !== uid)); // Use uid instead of id
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
        onClose={() => {
          setIsDialogOpen(false);
          setEditingUser(null);
        }}
        onSave={handleSaveUser}
        user={editingUser}
      />
      {/* <Button onClick={() => setIsDialogOpen(true)} variant="outline">
        Add User
      </Button> */}
      <Table className="mt-16 text-xl">
        <TableCaption>User List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">UID</TableHead>{" "}
            {/* Update header */}
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.uid}>
              {" "}
              <TableCell className="font-medium">{user.uid}</TableCell>{" "}
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={() => handleEdit(user)}
                >
                  Edit
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
