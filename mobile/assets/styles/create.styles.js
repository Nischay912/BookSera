// Importing the StyleSheet object from 'react-native'.
// StyleSheet lets us create CSS-like styles for our mobile components.
// It helps organize styles and gives better performance.
import { StyleSheet } from "react-native";

// Importing a COLORS object from our constants folder.
// COLORS contains predefined color values we use throughout the app.
// Instead of manually writing colors everywhere, we reuse them from this file.
import COLORS from "../../constants/colors";

// Creating a StyleSheet using StyleSheet.create() method.
// This method takes an object containing multiple style definitions.
// Each key inside this object becomes a style that we can use inside components.
const styles = StyleSheet.create({

  // Style for main container of the screen.
  container: {
    flexGrow: 1,                      // Allows container to grow depending on content height.
    backgroundColor: COLORS.background, // Sets the screen's background color.
    padding: 16,                      // Adds 16 units of space inside the container on all sides.
  },

  // Style for ScrollView container.
  scrollViewStyle: {
    flex: 1,                            // Makes the ScrollView take all available space.
    backgroundColor: COLORS.background, // Ensures scroll background matches main background.
  },

  // Style for a card-like UI block.
  card: {
    backgroundColor: COLORS.cardBackground, // Sets card background color.
    borderRadius: 16,                       // Rounds the corners of the card by 16 units.
    padding: 20,                             // Adds internal spacing to card.
    marginVertical: 16,                     // Adds 16 units of space above and below the card.
    shadowColor: COLORS.black,              // Shadow color for iOS.
    shadowOffset: { width: 0, height: 2 },  // Direction of the shadow.
    shadowOpacity: 0.1,                     // Darkness of shadow on iOS.
    shadowRadius: 8,                        // How blurry the shadow is.
    elevation: 3,                           // Shadow for Android.
    borderWidth: 1,                         // Thin border around card.
    borderColor: COLORS.border,             // Border color.
  },

  // Style for section header area.
  header: {
    alignItems: "center",  // Aligns all child components of this view to the center horizontally.
    marginBottom: 24,      // Gives space below the header.
  },

  // Style for the main title text.
  title: {
    fontSize: 24,                   // Makes the text large.
    fontWeight: "700",              // Makes the text bold.
    color: COLORS.textPrimary,      // Text color.
    marginBottom: 8,                // Adds spacing below the title.
  },

  // Style for subtitle text.
  subtitle: {
    fontSize: 14,                   // Smaller text size.
    color: COLORS.textSecondary,    // Lighter colored text.
    textAlign: "center",            // Centers the subtitle text.
  },

  // Style for main form container.
  form: {
    marginBottom: 16,               // Adds spacing below the form area.
  },

  // Style for each form group (label + input).
  formGroup: {
    marginBottom: 20,               // Space below each group for separation.
  },

  // Style for the label above inputs.
  label: {
    fontSize: 14,                   // Text size.
    marginBottom: 8,                // Space below label and above input.
    color: COLORS.textPrimary,      // Label text color.
    fontWeight: "500",              // Medium bold label.
  },

  // Style for input container that holds icon + input field.
  inputContainer: {
    flexDirection: "row",           // Places icon and input field side-by-side horizontally.
    alignItems: "center",           // Vertically centers both inside the container.
    backgroundColor: COLORS.inputBackground, // Light background for input box.
    borderRadius: 12,               // Rounded corners for input box.
    borderWidth: 1,                 // Border around input.
    borderColor: COLORS.border,     // Border color.
    paddingHorizontal: 12,          // Horizontal padding inside container.
  },

  // Style for the icon inside the input container.
  inputIcon: {
    marginRight: 10,                // Adds space between icon and text input.
  },

  // Style for the actual text input field.
  input: {
    flex: 1,                        // Input expands to take up all free space.
    height: 48,                     // Fixed height of input field.
    color: COLORS.textDark,         // Text color inside input.
  },

  // Style for multi-line text input (textarea).
  textArea: {
    backgroundColor: COLORS.inputBackground, // Same background as input field.
    borderRadius: 12,               // Rounded corners.
    borderWidth: 1,                 // Border around text area.
    borderColor: COLORS.border,     // Border color.
    padding: 12,                    // Internal padding.
    height: 100,                    // Fixed height for multi-line text.
    color: COLORS.textDark,         // Text color.
  },

  // Style for rating container that holds star icons.
  ratingContainer: {
    flexDirection: "row",           // Places stars in a row.
    justifyContent: "space-around", // Distributes stars evenly with spacing.
    alignItems: "center",           // Vertically centers stars.
    backgroundColor: COLORS.inputBackground, // Light background like input.
    borderRadius: 12,               // Rounded corners.
    borderWidth: 1,                 // Border around.
    borderColor: COLORS.border,     // Border color.
    padding: 8,                     // Internal padding.
  },

  // Style for each star button.
  starButton: {
    padding: 8,                     // Makes touch area bigger.
  },

  // Style for image picker box.
  imagePicker: {
    width: "100%",                  // Takes full width.
    height: 200,                    // Fixed height of picker area.
    backgroundColor: COLORS.inputBackground, // Light grey background.
    borderRadius: 12,               // Rounded corners.
    borderWidth: 1,                 // Border around.
    borderColor: COLORS.border,     // Border color.
    overflow: "hidden",             // Ensures image doesn't spill outside rounded corners.
  },

  // Style for preview image inside image picker.
  previewImage: {
    width: "100%",                  // Full width of container.
    height: "100%",                 // Full height of container.
  },

  // Style for placeholder area when no image is selected.
  placeholderContainer: {
    width: "100%",                  // Full width.
    height: "100%",                 // Full height.
    justifyContent: "center",       // Center placeholder vertically.
    alignItems: "center",           // Center placeholder horizontally.
  },

  // Style for placeholder text under icon.
  placeholderText: {
    color: COLORS.textSecondary,    // Grey colored text.
    marginTop: 8,                   // Space above placeholder text.
  },

  // Style for main submit button.
  button: {
    backgroundColor: COLORS.primary, // Button color.
    borderRadius: 12,                // Rounded edges.
    height: 50,                      // Fixed button height.
    flexDirection: "row",            // Aligns icon + text horizontally.
    justifyContent: "center",        // Centers content horizontally.
    alignItems: "center",            // Centers content vertically.
    marginTop: 16,                   // Space above button.
    shadowColor: COLORS.black,       // Button shadow color.
    shadowOffset: { width: 0, height: 2 }, // Shadow position.
    shadowOpacity: 0.1,              // Shadow transparency.
    shadowRadius: 4,                 // Blur radius of shadow.
    elevation: 2,                    // Android shadow.
  },

  // Style for button text.
  buttonText: {
    color: COLORS.white,             // Button text color.
    fontSize: 16,                    // Button text size.
    fontWeight: "600",               // Semi-bold text.
  },

  // Style for button icon.
  buttonIcon: {
    marginRight: 8,                  // Space between icon and button text.
  },
});

// Exporting the styles object so that other screens/components can use it.
// Without exporting, we can't import it elsewhere.
export default styles;
