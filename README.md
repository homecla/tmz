# TMZ - Time Zone Manager

A professional, responsive web application for managing time zones and converting times across different locations worldwide.

## Description

TMZ (Time Zone Manager) is a client-side web application that allows users to:
- Look up current time and time zone details for any location worldwide
- Convert specific times between different time zones
- Automatically detect and use their local time zone

Built with modern web technologies, TMZ provides an intuitive interface with real-time calculations and accurate time zone data including Daylight Saving Time (DST) handling.

## Features

### 🌍 Time Zone Lookup
- Instantly find current time, date, and time zone details for any location
- Intelligent auto-complete with time zone suggestions
- Displays location name, current time/date, time zone name, and UTC offset

### ⏰ Time Converter
- Convert times between any two time zones
- Select "From" and "To" locations with auto-complete
- Choose specific date and time for conversion
- Shows time difference between locations

### 📍 Local Time Detection
- Automatically detects browser's time zone on page load
- Prominent display of user's current time
- One-click option to use local time in converter

## Technologies Used

- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Responsive design with Flexbox and modern styling techniques
- **JavaScript (ES6+)**: Client-side functionality and interactivity
- **Luxon.js**: Robust time zone library for accurate IANA time zone data and DST handling
- **Font Awesome**: Iconography for enhanced user interface

## Responsive Design

TMZ is built with a mobile-first approach and fully responsive:
- Works on smartphones, tablets, and desktop computers
- Adapts layout based on screen size
- Touch-friendly interface with appropriately sized elements
- Optimized performance across all devices

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tmz-time-zone-manager.git
   ```

2. Navigate to the project directory:
   ```bash
   cd tmz-time-zone-manager
   ```

3. Open `index.html` in your web browser or serve with a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if http-server is installed)
   npx http-server
   ```

## Usage

1. **Time Zone Lookup**:
   - Type a city or location in the search box
   - Select from auto-complete suggestions
   - View current time and details for that location

2. **Time Conversion**:
   - Enter "From" location (or use "Use My Location" button)
   - Enter "To" location
   - Select date and time
   - See converted time automatically

3. **Local Time**:
   - Your time zone is automatically detected
   - Current time is displayed prominently
   - Click "Use My Location" to set converter's "From" field

## Browser Support

TMZ works on all modern browsers that support:
- ES6 JavaScript features
- Intl.DateTimeFormat API
- Luxon.js library

Tested on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the GNU General Public License v2.0 (GPL-2.0) - see the [LICENSE](LICENSE) file for details.

## Author

**Home Cla**
- GitHub: [@homecla]

## Credits

Special thanks to:
- **Luxon.js** - For providing excellent time zone handling capabilities
- **Font Awesome** - For beautiful icons that enhance the user interface

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Time zone data accuracy provided by the IANA time zone database via Luxon.js
- Inspired by the need for simple, accurate time zone conversions in our globalized world

---

*Made with ❤️ by HomeCla*
