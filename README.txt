# Daily Love Chest

Welcome to the Daily Love Chest project! This web application allows users to open a virtual chest once a day to reveal a heartfelt message expressing love. It is designed to be added to an Android home screen for easy access.

## Features

- **Daily Messages**: Users can open the chest once every 24 hours to receive a new love message.
- **Special Messages**: Occasionally reveals special decorated messages with enhanced visual effects.
- **Visual Effects**: Enjoy delightful animations and graphics when opening the chest.
- **Sound Effects**: Pleasant sounds accompany the chest opening, sparkles, and message reveal.
- **Animated Background**: Dynamic heart backgrounds with subtle animations create an immersive experience.
- **Offline Capabilities**: The application uses a service worker to enable offline access and caching for improved performance.
- **Responsive Design**: The application is designed to look great on all devices, from mobile phones to tablets.

## Project Structure

- **public/**: Contains static assets such as the favicon, manifest file, and service worker.
- **src/**: Contains the source code for the application, including HTML, CSS, and JavaScript files.
  - **assets/**: Contains SVG graphics for the chest and visual effects, and sound effects.
    - **sounds/**: Sound effects used throughout the application.
    - **favicon/**: Favicon icons for various platforms.
  - **css/**: Contains stylesheets for animations, main styles, and responsive design.
  - **js/**: Contains JavaScript files for application logic, including chest opening and message management.
  
## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd daily-love-chest
   ```
3. Add sound files to the `assets/sounds/` directory (see README in that folder).
4. Open `index.html` in your web browser to view the application.

## Customization

You can personalize the application by:

1. Adding or modifying love messages in `js/messages.js`
2. Customizing visual effects in `css/animations.css`
3. Changing the background animations in `js/background.js`
4. Modifying the chest appearance in the SVG files in the assets folder

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.