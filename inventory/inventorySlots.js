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
            case 0:
                this.amulet = "https://www.tibiawiki.com.br/images/a/ab/NoAmulet.gif";
                break;
            case 1:
                this.amulet = "https://www.tibiawiki.com.br/images/3/3e/Crystal_Necklace.gif"
                break;
            case 2:
                this.amulet = "https://www.tibiawiki.com.br/images/e/ee/Bronze_Amulet.gif";
                break;
            case 3:
                this.amulet = "https://www.tibiawiki.com.br/images/1/13/Amulet_of_Loss.gif";
                break;

            default:
                this.amulet = "https://www.tibiawiki.com.br/images/a/ab/NoAmulet.gif";
                break;
        }
    }
    updateWeapon(){
        switch(this.invLevels[1]){
            case 0:
                this.weapon = "https://www.tibiawiki.com.br/images/e/e6/NoWeaponRight.gif";
                break;
            case 1:
                this.weapon = "https://www.tibiawiki.com.br/images/3/3a/Dagger.gif";
                break;
            case 2:
                this.weapon = "https://www.tibiawiki.com.br/images/1/1f/Sword.gif";
                break;
            case 3:
                this.weapon = "https://www.tibiawiki.com.br/images/4/4c/Fire_Sword.gif";
                break;
            case 4:
                this.weapon = "https://www.tibiawiki.com.br/images/7/7a/Magic_Longsword.gif";
                break;

            default:
                this.weapon = "https://www.tibiawiki.com.br/images/e/e6/NoWeaponRight.gif";
                break;
        }
    }
    updateRing(){
        switch(this.invLevels[2]){
            case 0:
                this.ring = "https://www.tibiawiki.com.br/images/a/a8/NoRing.gif";
                break;
            case 1:
                this.ring = "https://www.tibiawiki.com.br/images/5/57/Star_Ring.gif";
                break;
            case 2:
                this.ring = "https://www.tibiawiki.com.br/images/1/1e/Life_Ring.gif";
                break;
            case 3:
                this.ring = "https://www.tibiawiki.com.br/images/1/13/Ring_of_Healing.gif";
                break;
            default:
                this.ring = "https://www.tibiawiki.com.br/images/a/a8/NoRing.gif";
                break;
        }
    }
    updateHelmet(){
        switch(this.invLevels[3]){
            case 0:
                this.helmet = "https://www.tibiawiki.com.br/images/4/4e/NoHelmet.gif";
                break;
            case 1:
                this.helmet = "https://www.tibiawiki.com.br/images/2/29/Leather_Helmet.gif";
                break;
            case 2:
                this.helmet = "https://www.tibiawiki.com.br/images/8/88/Chain_Helmet.gif";
                break;
            case 3:
                this.helmet = "https://www.tibiawiki.com.br/images/c/cc/Crown_Helmet.gif";
                break;
            case 4:
                this.helmet = "https://www.tibiawiki.com.br/images/4/4e/Demon_Helmet.gif";
                break;

            default:
                this.helmet = "https://www.tibiawiki.com.br/images/4/4e/NoHelmet.gif";
                break;
        }
    }
    updateArmor(){
        switch(this.invLevels[4]){
            case 0:
                this.armor = "https://www.tibiawiki.com.br/images/5/5d/NoArmor.gif";
                break;
            case 1:
                this.armor = "https://www.tibiawiki.com.br/images/c/c9/Jacket.gif";
                break;
            case 2:
                this.armor = "https://www.tibiawiki.com.br/images/2/29/Chain_Armor.gif";
                break;
            case 3:
                this.armor = "https://www.tibiawiki.com.br/images/7/7c/Crown_Armor.gif";
                break;
            case 4:
                this.armor = "https://www.tibiawiki.com.br/images/e/e0/Demon_Armor.gif";
                break;
            default:
                this.armor = "https://www.tibiawiki.com.br/images/5/5d/NoArmor.gif";
                break;
        }
    }
    updateLegs(){
        switch(this.invLevels[5]){
            case 0:
                this.legs = "https://www.tibiawiki.com.br/images/7/7d/NoLegs.gif";
                break;
            case 1:
                this.legs = "https://www.tibiawiki.com.br/images/0/07/Leather_Legs.gif";
                break;
            case 2:
                this.legs = "https://www.tibiawiki.com.br/images/0/03/Chain_Legs.gif";
                break;
            case 3:
                this.legs = "https://www.tibiawiki.com.br/images/2/2b/Crown_Legs.gif";
                break;
            case 4:
                this.legs = "https://www.tibiawiki.com.br/images/0/0d/Demon_Legs.gif";
                break;
            default:
                this.legs = "https://www.tibiawiki.com.br/images/7/7d/NoLegs.gif";
                break;
        }
    }
    updateBoots(){
        switch(this.invLevels[6]){
            case 0:
                this.boots = "https://www.tibiawiki.com.br/images/1/10/NoBoots.gif";
                break;
            case 1:
                this.boots = "https://www.tibiawiki.com.br/images/9/94/Leather_Boots.gif";
                break;
            case 2:
                this.boots = "https://www.tibiawiki.com.br/images/d/d4/Golden_Boots.gif";
                break;
            case 3:
                this.boots = "https://www.tibiawiki.com.br/images/2/2d/Pair_of_Soft_Boots.gif";
                break;
            case 4:
                break;

            default:
                this.boots = "https://www.tibiawiki.com.br/images/1/10/NoBoots.gif";
                break;
        }
    }
    updateBag(){
        switch(this.invLevels[7]){
            case 0:
                this.bag = "https://www.tibiawiki.com.br/images/d/dc/NoBag.gif";
                break;
            case 1:
                this.bag = "https://www.tibiawiki.com.br/images/d/d6/Bag.gif";
                break;
            case 2:
                this.bag = "https://www.tibiawiki.com.br/images/9/9a/Backpack.gif";
                break;
            case 3:
                this.bag = "https://www.tibiawiki.com.br/images/6/6d/Buggy_Backpack.gif";
                break;

            default:
                this.bag = "https://www.tibiawiki.com.br/images/d/dc/NoBag.gif";
                break;
        }
    }
    updateShield(){
        switch(this.invLevels[8]){
            case 0:
                this.shield = "https://www.tibiawiki.com.br/images/4/44/NoWeaponLeft.gif";
                break;
            case 1:
                this.shield = "https://www.tibiawiki.com.br/images/2/2d/Wooden_Shield.gif";
                break;
            case 2:
                this.shield = "https://www.tibiawiki.com.br/images/1/17/Steel_Shield.gif";
                break;
            case 3:
                this.shield = "https://www.tibiawiki.com.br/images/4/41/Crown_Shield.gif";
                break;
            case 4:
                this.shield = "https://www.tibiawiki.com.br/images/4/4f/Demon_Shield.gif";
                break;
            case 5:
                this.shield = "https://www.tibiawiki.com.br/images/1/1f/Blessed_Shield.gif";
                break;
            default:
                this.shield = "https://www.tibiawiki.com.br/images/4/44/NoWeaponLeft.gif";
                break;
        }
    }
    updateAmmo(){
        switch(this.invLevels[9]){
            case 0:
                this.ammo = "https://www.tibiawiki.com.br/images/d/d2/NoAmmo.gif";
                break;
            case 1:
                this.ammo = "https://www.tibiawiki.com.br/images/6/69/Arrow.gif";
                break;
            case 2:
                this.ammo = "https://www.tibiawiki.com.br/images/4/46/Diamond_Arrow.gif"
                break;

            default:
                this.ammo = "https://www.tibiawiki.com.br/images/d/d2/NoAmmo.gif";
                break;
        }
    }
}

