/**
 * Revolution calculator specifically for Necromancy abilities.
 *
 * If you're reading this file on the wiki, be aware that this is a transpiled (ES6 -> ES5) version of the script. You
 * can find the pre-transpiled script on https://github.com/weirdgloop/revocalc-necro.
 *
 * @author Jayden
 * @author Cook Me Plox
 */

interface Ability {
    // Use this to override image, otherwise [key].png will be used
    img?: string;
}

const calcClass = 'revo-calc-necro';
const abilitySlot = $('<div>').addClass('revo-calc-slot');

const ABILITIES_MAP: {[k: string]: Ability} = {
    'Necromancy': {
        img: 'Necromancy (ability).png'
    },
    'Conjure Skeleton Warrior': {},
    'Touch of Death': {},
    'Finger of Death': {},
    'Command Skeleton Warrior': {},
    'Death Skulls': {},
    'Blood Siphon': {},
    'Conjure Putrid Zombies': {},
    'Conjure Vengeful Ghost': {},
    'Bloat': {},
    'Soul Sap': {},
    'Soul Strike': {},
    'Command Putrid Zombies': {},
    'Command Vengeful Ghost': {},
    'Spectral Scythe': {}
}

let slots = [];

// This number can be changed to set the number of slots in the action bar
let actionBarSlots = 10;

let draggedAbility: HTMLElement = null;

const onDragOver = (e: JQuery.DragOverEvent<HTMLElement>) => {
    e.preventDefault();
    if (!e.currentTarget.classList.contains('hovering')) e.currentTarget.classList.add('hovering');
}

const onDragLeave = (e: JQuery.DragLeaveEvent<HTMLElement>) => {
    e.preventDefault();
    if (e.currentTarget.classList.contains('hovering')) e.currentTarget.classList.remove('hovering');
}

const init = () => {
    // If there is no class for the calculator present on the page, do nothing in this script.
    if (!$(`.${calcClass}`).length) {
        return;
    }

    // Begin creating the interface for the calculator.
    createCalculatorInterface();
}

const createCalculatorInterface = () => {
    // Create the abilities UI
    const abilities = $('<div>').addClass('revo-calc-abilities');

    abilities.on('dragover', onDragOver);
    abilities.on('dragleave', onDragLeave);

    abilities.on('drop', (e) => {
        e.preventDefault();
        let $draggedAbility = $(draggedAbility);
        if (e.currentTarget.classList.contains('hovering')) e.currentTarget.classList.remove('hovering');

        // If the dragged ability isn't already here, append it
        let $targetChildren = $(e.currentTarget).find(`[data-ability-name='${$draggedAbility.attr('data-ability-name')}']`);
        if ($targetChildren.length === 0) {
            $(e.currentTarget).append(draggedAbility);
        }
    })

    for (let a in ABILITIES_MAP) {
        let info = ABILITIES_MAP[a];

        let ability = $('<div>').addClass('revo-calc-ability')
            .attr('data-ability-name', a)
            .attr('draggable', 'true')
            .css({
                'background': `url(${rs.getFileURLCached(info.img ? info.img : a + '.png')})`
            })

        // new window.Tooltip(ability, {
        //     placement: 'top',
        //     title: a
        // });

        // Add drag event to the abilities
        ability.on('dragstart', (e) => {
            draggedAbility = e.target;

            e.originalEvent.dataTransfer.dropEffect = 'copy';

            // we're not using the following line but FF seems to require it
            // to recognise we're doing a drag?
            e.originalEvent.dataTransfer.setData('text', 'shrug');
        })

        abilities.append(ability);
    }

    // Create the action bar UI
    const actionBar = $('<div>').addClass('revo-calc-bar');

    // Create all the slots
    for (let i = 0; i < actionBarSlots; i++) {
        let slot = abilitySlot.clone().attr('data-slot-id', i);

        slot.on('dragover', onDragOver);
        slot.on('dragleave', onDragLeave);

        slot.on('drop', (e) => {
            e.preventDefault();
            let $draggedAbility = $(draggedAbility);
            if (e.currentTarget.classList.contains('hovering')) e.currentTarget.classList.remove('hovering');

            // If there's any abilities already appended to the drop target...
            let $targetChildren = $(e.currentTarget).children();
            if ($targetChildren.length > 0 && $targetChildren.attr('data-ability-name') !== $draggedAbility.attr('data-ability-name')) {
                // Add them back to the abilities UI
                $(abilities).append($targetChildren);
            }

            // Append the ability to the drop target
            $(e.currentTarget).append(draggedAbility);
        })

        slots.push(slot);
    }

    // Append the slots to the action bar
    actionBar.append(slots);

    // Append the components to the calculator
    $(`.${calcClass}`).append($('<h4>')
        .text('Drag abilities to the action bar')
        .css({'margin-bottom': '.25em'}), abilities, actionBar);
}

mw.loader.using(['ext.gadget.rsw-util', 'ext.gadget.tooltip'], function () {
    $(init);
})