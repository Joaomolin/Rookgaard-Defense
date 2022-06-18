export class InventorySlots {
    constructor(invSlots, invLevels){
        this.invSlots = invSlots;
        this.invLevels = invLevels;

        this.amulet = null;
        this.weapon = null;
        this.ring = null;
        this.helmet = null;
        this.armor = null;
        this.legs = null;
        this.boots = null;
        this.bag = null;
        this.shield = null;
        this.ammo = null;

        this.updateInventory();
    }

    getImageSource(i){
        this.updateInventory();

        switch(this.invSlots[i]){
            case 'amulet':
                return this.amulet;
            break;
            case 'weapon':
                return this.weapon;
            break;
            case 'ring':
                return this.ring;
            break;
            case 'helmet':
                return this.helmet;
            break;
            case 'armor':
                return this.armor;
            break;
            case 'legs':
                return this.legs;
            break;
            case 'boots':
                return this.boots;
            break;
            case 'bag':
                return this.bag;
            break;
            case 'shield':
                return this.shield;
            break;
            case 'ammo':
                return this.ammo;
            break;
        
        }
        
        console.log('FAILED TO GET SLOT');
        return null;
    }

    updateInventory(){
        this.updateAmulet();
        this.updateWeapon();
        this.updateRing();
        this.updateHelmet();
        this.updateArmor();
        this.updateLegs();
        this.updateBoots();
        this.updateBag();
        this.updateShield();
        this.updateAmmo();
    }

    updateAmulet(){
        switch(this.invLevels[0]){
            case 1:
                this.amulet = "https://www.tibiawiki.com.br/images/1/18/Silver_Amulet.gif";
                break;
            case 2:
                this.amulet = "https://www.tibiawiki.com.br/images/1/13/Amulet_of_Loss.gif";
                break;

            default:
                this.amulet = "https://www.tibiawiki.com.br/images/a/ab/NoAmulet.gif";
                break;
        }
    }
    updateWeapon(){
        switch(this.invLevels[1]){
            case 1:
                this.weapon = "https://www.tibiawiki.com.br/images/3/3a/Dagger.gif";
                break;

            default:
                this.weapon = "https://www.tibiawiki.com.br/images/e/e6/NoWeaponRight.gif";
                break;
        }
    }
    updateRing(){
        switch(this.invLevels[2]){
            case 1:
                this.ring = "https://www.tibiawiki.com.br/images/5/57/Star_Ring.gif";
                break;

            default:
                this.ring = "https://www.tibiawiki.com.br/images/a/a8/NoRing.gif";
                break;
        }
    }
    updateHelmet(){
        switch(this.invLevels[3]){
            case 1:
                this.helmet = "https://www.tibiawiki.com.br/images/2/29/Leather_Helmet.gif";
                break;

            default:
                this.helmet = "https://www.tibiawiki.com.br/images/4/4e/NoHelmet.gif";
                break;
        }
    }
    updateArmor(){
        switch(this.invLevels[4]){
            case 1:
                this.armor = "https://www.tibiawiki.com.br/images/c/c9/Jacket.gif";
                break;

            default:
                this.armor = "https://www.tibiawiki.com.br/images/5/5d/NoArmor.gif";
                break;
        }
    }
    updateLegs(){
        switch(this.invLevels[5]){
            case 1:
                this.legs = "https://www.tibiawiki.com.br/images/0/07/Leather_Legs.gif";
                break;

            default:
                this.legs = "https://www.tibiawiki.com.br/images/7/7d/NoLegs.gif";
                break;
        }
    }
    updateBoots(){
        switch(this.invLevels[6]){
            case 1:
                this.boots = "https://www.tibiawiki.com.br/images/9/94/Leather_Boots.gif";
                break;

            default:
                this.boots = "https://www.tibiawiki.com.br/images/1/10/NoBoots.gif";
                break;
        }
    }
    updateBag(){
        switch(this.invLevels[7]){
            case 1:
                this.bag = "https://www.tibiawiki.com.br/images/6/6d/Buggy_Backpack.gif";
                break;

            default:
                this.bag = "https://www.tibiawiki.com.br/images/d/dc/NoBag.gif";
                break;
        }
    }
    updateShield(){
        switch(this.invLevels[8]){
            case 1:
                this.shield = "https://www.tibiawiki.com.br/images/2/2d/Wooden_Shield.gif";
                break;

            default:
                this.shield = "https://www.tibiawiki.com.br/images/4/44/NoWeaponLeft.gif";
                break;
        }
    }
    updateAmmo(){
        switch(this.invLevels[9]){
            case 1:
                this.ammo = "https://www.tibiawiki.com.br/images/6/69/Arrow.gif";
                break;

            default:
                this.ammo = "https://www.tibiawiki.com.br/images/d/d2/NoAmmo.gif";
                break;
        }
    }
}

