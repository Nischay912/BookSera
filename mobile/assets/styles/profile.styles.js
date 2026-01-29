// Importing StyleSheet from React Native.
// StyleSheet helps us create optimized style objects similar to CSS.
import { StyleSheet } from "react-native";

// Importing COLORS file that stores all our theme colors in one place.
// Using a central color file ensures design consistency across the app.
import COLORS from "../../constants/colors";

// Creating a StyleSheet using StyleSheet.create()
// This makes the styles efficient and prevents accidental modifications.
const styles = StyleSheet.create({

  // MAIN SCREEN CONTAINER
  container: {
    flex: 1,                        // Makes container fill the entire screen height.
    backgroundColor: COLORS.background, // Background color of screen.
    padding: 16,                    // Adds space around the edges.
    paddingBottom: 0,               // Removes bottom padding for snug layout.
  },

  // LOADING SCREEN CONTAINER (e.g., when data is still loading)
  loadingContainer: {
    flex: 1,                        // Fills the whole screen.
    justifyContent: "center",       // Centers loader vertically.
    alignItems: "center",           // Centers loader horizontally.
    backgroundColor: COLORS.background, // Makes background same as main screen.
  },

  // PROFILE HEADER CARD (contains avatar + username + email)
  profileHeader: {
    flexDirection: "row",           // Places image & text side-by-side horizontally.
    alignItems: "center",           // Vertically aligns items in the center.
    backgroundColor: COLORS.cardBackground, // Card-like background.
    borderRadius: 16,               // Smooth rounded corners.
    padding: 16,                    // Internal padding for breathing space.
    marginBottom: 16,               // Space below this card before next content.
    shadowColor: COLORS.black,      // iOS shadow color.
    shadowOffset: { width: 0, height: 2 }, // Shadow direction.
    shadowOpacity: 0.1,             // Light shadow.
    shadowRadius: 8,                // How blurry the shadow looks.
    elevation: 3,                   // Android shadow depth.
    borderWidth: 1,                 // Thin border around card.
    borderColor: COLORS.border,     // Color for the border.
  },

  // USER PROFILE IMAGE
  profileImage: {
    width: 80,                      // Fixed width of image.
    height: 80,                     // Fixed height of image.
    borderRadius: 40,               // Makes the image a perfect circle (80/2).
    marginRight: 16,                // Space between image and user info.
  },

  // CONTAINER FOR USER TEXT (username + email + member since)
  profileInfo: {
    flex: 1,                        // Takes up remaining horizontal space.
  },

  // USERNAME TEXT
  username: {
    fontSize: 20,                   // Larger text size for importance.
    fontWeight: "700",              // Bold font weight.
    color: COLORS.textPrimary,      // Primary dark text color.
    marginBottom: 4,                // Small gap under the username.
  },

  // USER EMAIL TEXT
  email: {
    fontSize: 14,                   // Smaller than username.
    color: COLORS.textSecondary,    // Greyish text color (secondary info).
    marginBottom: 4,                // Spacing under email.
  },

  // "Member since" TEXT
  memberSince: {
    fontSize: 12,                   // Small text for less important info.
    color: COLORS.textSecondary,    // Grey color.
  },

  // LOGOUT BUTTON
  logoutButton: {
    backgroundColor: COLORS.primary, // Bright main color for attention.
    borderRadius: 12,                // Rounded button shape.
    padding: 12,                     // Inner padding around text & icon.
    flexDirection: "row",            // Places icon + text side-by-side.
    alignItems: "center",            // Centers the items vertically.
    justifyContent: "center",        // Centers content horizontally.
    marginBottom: 24,                // Space below logout button.
    shadowColor: COLORS.black,       // Button shadow color.
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,                    // Android shadow.
  },

  // TEXT inside logout button
  logoutText: {
    color: COLORS.white,             // White text for contrast.
    fontWeight: "600",               // Semi-bold text.
    marginLeft: 8,                   // Space between icon and text.
  },

  // HEADER FOR USER'S BOOK LIST SECTION
  booksHeader: {
    flexDirection: "row",            // Title on left, count on right.
    justifyContent: "space-between", // Pushes items to opposite ends.
    alignItems: "center",            // Aligns both items vertically.
    marginBottom: 16,                // Space under header.
  },

  // "My Books" TITLE TEXT
  booksTitle: {
    fontSize: 18,                    // Medium large font.
    fontWeight: "700",               // Bold title.
    color: COLORS.textPrimary,       // Main text color.
  },

  // "10 books" TEXT
  booksCount: {
    fontSize: 14,                    // Smaller font.
    color: COLORS.textSecondary,     // Light grey.
  },

  // LIST CONTAINER FOR ALL BOOK ITEMS
  booksList: {
    paddingBottom: 20,               // Extra space at bottom to avoid cutoff.
  },

  // INDIVIDUAL BOOK ROW ITEM
  bookItem: {
    flexDirection: "row",            // Image left, text right.
    backgroundColor: COLORS.cardBackground,  // Card-like background.
    borderRadius: 12,                // Rounded card edges.
    padding: 12,                     // Inner padding.
    marginBottom: 12,                // Space between each book row.
    shadowColor: COLORS.black,       // Shadow color.
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,                    // Android shadow.
    borderWidth: 1,                  // Thin border.
    borderColor: COLORS.border,      // Border color.
  },

  // BOOK THUMBNAIL IMAGE
  bookImage: {
    width: 70,                       // Thumbnail width.
    height: 100,                     // Thumbnail height.
    borderRadius: 8,                 // Slightly rounded edges.
    marginRight: 12,                 // Space between image and text.
  },

  // TEXT CONTAINER FOR EACH BOOK
  bookInfo: {
    flex: 1,                         // Take remaining horizontal space.
    justifyContent: "space-between", // Space between top text and bottom date.
  },

  // BOOK TITLE
  bookTitle: {
    fontSize: 16,                    // Medium-large readable size.
    fontWeight: "600",               // Semi-bold weight.
    color: COLORS.textPrimary,       // Primary text color.
    marginBottom: 4,                 // Gap under title.
  },

  // RATING STARS CONTAINER
  ratingContainer: {
    flexDirection: "row",            // Stars appear horizontally.
    marginBottom: 4,                 // Space below rating row.
  },

  // BOOK CAPTION OR DESCRIPTION
  bookCaption: {
    fontSize: 14,                    // Normal readable font.
    color: COLORS.textDark,          // Darker text.
    marginBottom: 4,                 // Space below caption.
    flex: 1,                         // Let caption take remaining vertical space.
  },

  // DATE OF BOOK POST
  bookDate: {
    fontSize: 12,                    // Small font.
    color: COLORS.textSecondary,     // Light grey.
  },

  // DELETE BUTTON FOR EACH BOOK ITEM
  deleteButton: {
    padding: 8,                      // Makes touch area comfortable.
    justifyContent: "center",        // Vertically centers icon.
  },

  // EMPTY SCREEN CONTAINER WHEN USER HAS NO BOOKS
  emptyContainer: {
    alignItems: "center",            // Center horizontally.
    justifyContent: "center",        // Center vertically.
    padding: 40,                     // Internal padding.
    marginTop: 20,                   // Slight gap from top.
  },

  // MAIN EMPTY TEXT
  emptyText: {
    fontSize: 16,                    // Medium size text.
    fontWeight: "600",               // Semi-bold.
    color: COLORS.textPrimary,       // Main text color.
    marginTop: 16,                   // Space above text.
    marginBottom: 20,                // Space below text.
    textAlign: "center",             // Center alignment.
  },

  // ADD BOOK BUTTON
  addButton: {
    backgroundColor: COLORS.primary, // Button color.
    borderRadius: 12,                // Rounded edges.
    paddingVertical: 12,             // Vertical padding.
    paddingHorizontal: 20,           // Horizontal padding.
    shadowColor: COLORS.black,       // Shadow color.
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,                    // Android shadow.
  },

  // TEXT INSIDE ADD BUTTON
  addButtonText: {
    color: COLORS.white,             // White text for contrast.
    fontWeight: "600",               // Slightly bold.
    fontSize: 14,                    // Medium font size.
  },
});

// Exporting styles so they can be used in Profile screen.
export default styles;
