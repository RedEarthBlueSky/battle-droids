###Battle Droid

####First Iteration

I wanted this to be a project on networking and multiplayer

Based in the 2D shooter asteroid, where a single player shoots asteroids,
with a multiplayer and movement elements

**Software**
  NodeJS      Server
  npm         Library Installer
  Atom        Text Editor
  Chrome      Client
  Terminal    hyperterm but any default cmd will do

**OS**
  Max OSX     Currently pcs only but should work in chrome any PC

**Packages** /    Libraries
  Express     Deliver files
  socket.io   communication

**Render**
  Canvas      Container lets you draw graphics via JavaScript

**Database**
  First instances no database required as infinite game


**Project Folder Structure
  app.js        // entry point of app
  package.json  // npm init
  .gitignore    // npm_modules
  node_modules
    express
    socket.io
  /server
  /client
    /js
    /img
    index.html


HTML5
Canvas is a frame that allows you to create and animate with JavaScript.  

Drawing on canvas is expensive.

To reduce drawing;

Use multiple canvases game pieces. This boosts performance. So we’ll be layering three canvases, one on top of the other, to create the illusion of a single game. I’ll explain why we’ll be using three canvases in later tutorials. But for now, we’ll just be using one to pan the background.

The other thing to note about HTML5 games is that poorly coded JavaScript can cause lots of problems. Poor code quality is normally bad, but it’s especially bad on the web. Thus we’ll be using a few advanced game structures and coding techniques so that our code  is well written and as quick as we can get it.

With that in mind, we can begin coding. For this tutorial, we’ll focus on getting the webpage set up and getting the starry background to pan across the screen.
