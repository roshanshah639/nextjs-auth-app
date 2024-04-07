import React from "react";

const UserProfille = ({ params }: any) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl">
        Profile Of{" "}
        <span className="bg-cyan-700 rounded px-4 py-1 ml-1">{params.id}</span>
      </h1>
      
    </main>
  );
};

export default UserProfille;
