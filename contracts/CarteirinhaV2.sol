// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @custom:security-contact andersoncampolina1@gmail.com
contract CarteirinhaV2 is ERC721, ERC721Enumerable, Pausable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("CarteirinhaV2", "CNFT2") {}

    // Mapping owner address to Historico[]
    mapping(address => Historico[]) private _historico;
    // creates an object array for dinamic historical data
    struct Historico {
        string nomeConquista;
        string dataConquista;
        string idConquista;     
    }

    Historico[] public historico;

    function adicionarConquistaHistorico(string memory nomeConquista_, string memory dataConquista_, string memory idConquista_) public onlyOwner {
        historico.push(Historico(nomeConquista_, dataConquista_, idConquista_));
    }

    function consultarHistorico() public view returns(Historico[] memory) {
        return historico;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
