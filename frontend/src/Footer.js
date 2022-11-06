import React, { Component, useEffect, useState } from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return <footer>{`Copyright © E-learning ${year}`}</footer>;
};

export default Footer;
