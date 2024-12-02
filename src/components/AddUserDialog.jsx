import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/services/api";

const AddUserDialog = ({ isOpen, onClose, onSave, user }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");

  const handleSave = () => {
    const newUser = { name, email, password, phone, address };
    onSave(newUser);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? "Edit User" : "Add User"}</DialogTitle>
          <DialogDescription>
            {user ? "Edit the details of the user." : "Fill out the form to add a new user."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
          <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
        </div>
        <DialogFooter>
          <Button onClick={handleSave} variant="outline">
            Save
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
