// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract UrlContract {

    struct URL {
        string title;
        string url;
        address submittedBy;
        uint256 upvotes;
        uint256 downvotes;
        uint256[] tagIds;
    }

    struct Tag {
        string name;
        address createdBy;
        uint256[] urlIds;
    }

    struct User {
        uint256[] upvotedURLs;
        uint256[] downvotedURLs;
        uint256[] submittedURLs;
    }

    struct Tags {
        Tag[] list;
        mapping (string => uint256) names;
    }

    URL[] private urls;
    Tags private tags;
    mapping (address => User) private users;
    mapping (uint256 => uint256) public testing;

    /// @notice Initialize contract with one tag
    /// @dev Initialize with one tag to prevent the mapping of initial tag (0) to be confused as a empty value
    /// @param firstTag First tag name
    constructor (string memory firstTag) {
        Tag memory newTag = Tag(firstTag, msg.sender, new uint256[](0));
        tags.list.push(newTag);
    }

    /// @notice Save URL in smart contract. Create tags if they don't exist
    /// @dev The function flow is: get url id, create tags (and save url id), save url
    /// @param title URL content title
    /// @param url URL link
    /// @param _tags Tag names list associated with URL.
    function submitURL(string memory title, string memory url, string[] calldata _tags) public {
        require(bytes(title).length > 0 && bytes(url).length > 0 && _tags.length > 0, "Invalid input");
        // If tx fails then changes rollback. We can be sure url index in the beginning = url index in the end
        uint256 urlIndex = urls.length;
        // get tag indexes or create new tags. Also add url index to each tag
        uint256[] memory tagIndexes = new uint256[](_tags.length);
        for (uint256 i = 0; i < _tags.length; i++) {
            tagIndexes[i] = createTagIfNotExists(_tags[i]);
            addUrlToTag(tagIndexes[i], urlIndex);
        }
        // add new url to array
        URL memory newURL = URL(title, url, msg.sender, 0, 0, tagIndexes);
        urls.push(newURL);
    }

    /// @notice Get a tag id from array or add a new tag if it doesn't exist
    /// @dev It is used inside submitURL but it should be available to be called alone
    /// @param name Tag name
    function createTagIfNotExists(string memory name) public returns (uint256){
        // check if it is the first tag in the array
        string memory firstTag = tags.list[0].name;
        if (keccak256(bytes(name)) == keccak256(bytes(firstTag))){
            return 0;
        }
        // check if tag is already registered
        uint256 index = tags.names[name];
        if (index == 0){
            // add new tag to array
            Tag memory newTag = Tag(name, msg.sender, new uint256[](0));
            tags.list.push(newTag);
            uint256 newIndex = tags.list.length - 1;
            tags.names[name] = newIndex;
            return newIndex;
        }
        return index;
    }

    /// @notice Save URL id in tag object so it is easily retrievable later
    /// @dev It is an internal function used inside submitURL
    /// @param index Tag id
    /// @param url URL id
    function addUrlToTag(uint256 index, uint256 url) internal {
        tags.list[index].urlIds.push(url);
    }

    /// @notice Retrieve all URLs associated with a specific tag name
    /// @param name Tag name
    function getURLsByTag(string memory name) public view returns (URL[] memory) {
        // check if it is the frist tag in the array
        string memory firstTag = tags.list[0].name;
        require(keccak256(bytes(name)) != keccak256(bytes(firstTag)), "This is the first tag. It is invalid");
        // check that the tag exists
        uint256 index = tags.names[name];
        require(index != 0, "Tag not found");

        uint256[] memory urlIds =  tags.list[index].urlIds;
        uint256 length = urlIds.length;
        URL[] memory result = new URL[](length);
        for (uint256 i =0; i < length; i ++){
            result[i] = urls[urlIds[i]];
        }
        return result;
    }

    /// @notice Retrieve all registered URLs
    function getAllURLs() public view returns (URL[] memory) {
        return urls;
    }

    /// @notice Retrieve all URLs submitted by a specific user
    /// @param userAddress User id
    function getURLsByUser(address userAddress) public view returns (URL[] memory) {
        uint256[] memory userSubmittedURLs = users[userAddress].submittedURLs;
        URL[] memory result = new URL[](userSubmittedURLs.length);
        for (uint256 i = 0; i < userSubmittedURLs.length; i++) {
            result[i] = urls[userSubmittedURLs[i]];
        }
        return result;
    }

    /// @notice Get a specific URL
    /// @param index URL id
    function getURL(uint256 index) public view returns (URL memory) {
        require(index < urls.length, "Invalid URL index");
        return urls[index];
    }

    /// @notice Get a specific tag
    /// @param index Tag id
    function getTag(uint256 index) public view returns (Tag memory) {
        require(index < tags.list.length, "Invalid Tag index");
        return tags.list[index];
    }

    /// @notice Get all upvoted URLs of a specific user
    /// @param userAddress User id
    function getUserUpvotedURLs(address userAddress) public view returns (URL[] memory) {
        uint256[] memory userUpvotedURLs = users[userAddress].upvotedURLs;
        URL[] memory result = new URL[](userUpvotedURLs.length);
        for (uint256 i = 0; i < userUpvotedURLs.length; i++) {
            result[i] = urls[userUpvotedURLs[i]];
        }
        return result;
    }

    /// @notice Get all downvoted URLs of a specific user
    /// @param userAddress User id
    function getUserDownvotedURLs(address userAddress) public view returns (URL[] memory) {
        uint256[] memory userDownvotedURLs = users[userAddress].downvotedURLs;
        URL[] memory result = new URL[](userDownvotedURLs.length);
        for (uint256 i = 0; i < userDownvotedURLs.length; i++) {
            result[i] = urls[userDownvotedURLs[i]];
        }
        return result;
    }

    /// @notice Get all submitted URLs of a specific user
    /// @param userAddress User id
    function getUserSubmittedURLs(address userAddress) public view returns (URL[] memory) {
        uint256[] memory userSubmittedURLs = users[userAddress].submittedURLs;
        URL[] memory result = new URL[](userSubmittedURLs.length);
        for (uint256 i = 0; i < userSubmittedURLs.length; i++) {
            result[i] = urls[userSubmittedURLs[i]];
        }
        return result;
    }
}
