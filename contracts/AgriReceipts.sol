// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AgriReceipts is ERC721URIStorage, Ownable {
    uint256 public nextId;

    event SaleRecorded(
        uint256 indexed id,
        address indexed buyer,
        address indexed farmer,
        uint256 amount
    );

    constructor() ERC721("AgriTrackReceipt", "AGRT") {}

    function mintReceipt(address farmer, string calldata metadataURI) external returns (uint256) {
        uint256 id = ++nextId;
        _mint(farmer, id);
        _setTokenURI(id, metadataURI);
        emit SaleRecorded(id, msg.sender, farmer, 0);
        return id;
    }
}
