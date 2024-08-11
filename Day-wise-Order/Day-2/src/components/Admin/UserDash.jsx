import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UserDash = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://in-telli-ventory.onrender.com/users');
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://in-telli-ventory.onrender.com/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      setError('Failed to delete user.');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditedUser(user);
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://in-telli-ventory.onrender.com/users/${editingUser.id}`, editedUser);
      setUsers(users.map(user => (user.id === editingUser.id ? editedUser : user)));
      setEditingUser(null);
    } catch (error) {
      setError('Failed to update user.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Table className='mt-16 text-xl'>
      <TableCaption>User List</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user => (
          <TableRow key={user.id}>
           <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.firstname}</TableCell>
            <TableCell>{user.lastname}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className='text-lg' onClick={() => handleEdit(user)}>Edit</Button>
                </PopoverTrigger>
                {editingUser && editingUser.id === user.id && (
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none ">Edit User</h4>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="firstname">First Name</Label>
                          <Input
                            id="firstname"
                            value={editedUser.firstname}
                            onChange={(e) => setEditedUser({ ...editedUser, firstname: e.target.value })}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="lastname">Last Name</Label>
                          <Input
                            id="lastname"
                            value={editedUser.lastname}
                            onChange={(e) => setEditedUser({ ...editedUser, lastname: e.target.value })}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            value={editedUser.email}
                            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                            className="col-span-2 h-8"
                          />
                        </div>
                        <Button onClick={handleSave}>Save</Button>
                      </div>
                    </div>
                  </PopoverContent>
                )}
              </Popover>
              <Button variant="outline" className='text-lg' onClick={() => handleDelete(user.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserDash;
