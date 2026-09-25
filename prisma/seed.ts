import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Diamond Dental database seeding...");

  // 1. Seed Predefined Staff Accounts (Rule 30 & 31: Passwords hashed, exactly 2 predefined accounts)
  const saltRounds = 10;
  const adminPasswordHash = await bcrypt.hash("AdminPassword123!", saltRounds);
  const clerkPasswordHash = await bcrypt.hash("ClerkPassword123!", saltRounds);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@diamonddental.et" },
    update: {},
    create: {
      email: "admin@diamonddental.et",
      name: "Clinic Owner",
      passwordHash: adminPasswordHash,
      role: Role.ADMIN,
    },
  });

  const clerkUser = await prisma.user.upsert({
    where: { email: "clerk@diamonddental.et" },
    update: {},
    create: {
      email: "clerk@diamonddental.et",
      name: "Store Clerk",
      passwordHash: clerkPasswordHash,
      role: Role.CLERK,
    },
  });

  console.log(`✓ Seeded users: Admin (${adminUser.email}), Clerk (${clerkUser.email})`);

  // 2. Seed Categories
  const generalCategory = await prisma.category.upsert({
    where: { slug: "general-dental-care" },
    update: {},
    create: {
      name: "General Dental Care",
      slug: "general-dental-care",
      description: "Everyday dental hygiene packages and products.",
    },
  });

  const bracesCategory = await prisma.category.upsert({
    where: { slug: "braces-care" },
    update: {},
    create: {
      name: "Braces Care",
      slug: "braces-care",
      description: "Specialized orthodontic care packages for braces wearers.",
    },
  });

  const standaloneCategory = await prisma.category.upsert({
    where: { slug: "standalone-products" },
    update: {},
    create: {
      name: "Standalone Products",
      slug: "standalone-products",
      description: "High-value, individual dental devices and care items.",
    },
  });

  console.log("✓ Seeded categories: General Dental Care, Braces Care, Standalone Products");

  // 3. Seed Inventory Items (Raw Components & Standalone Physical Stock)
  const inventoryData = [
    { sku: "COMP-TB-01", name: "Toothbrush", physicalStock: 30, reserveStock: 5, isStandalone: false },
    { sku: "COMP-DF-01", name: "Dental Floss", physicalStock: 20, reserveStock: 0, isStandalone: false },
    { sku: "COMP-IB-01", name: "Interdental Brush", physicalStock: 25, reserveStock: 0, isStandalone: false },
    { sku: "COMP-MW-01", name: "Mouthwash", physicalStock: 15, reserveStock: 0, isStandalone: false },
    { sku: "COMP-OTB-01", name: "Orthodontic Toothbrush", physicalStock: 40, reserveStock: 5, isStandalone: false },
    { sku: "COMP-OF-01", name: "Orthodontic Floss", physicalStock: 30, reserveStock: 0, isStandalone: false },
    { sku: "COMP-FT-01", name: "Floss Threader", physicalStock: 10, reserveStock: 0, isStandalone: false },
    { sku: "COMP-OW-01", name: "Orthodontic Wax", physicalStock: 25, reserveStock: 0, isStandalone: false },
    // Standalone physical items
    { sku: "STN-WF-01", name: "Water Flosser Unit", physicalStock: 12, reserveStock: 2, isStandalone: true },
    { sku: "STN-ETB-01", name: "Electric Toothbrush Unit", physicalStock: 8, reserveStock: 1, isStandalone: true },
    { sku: "STN-LMW-01", name: "Large Mouthwash Pack Unit", physicalStock: 15, reserveStock: 2, isStandalone: true },
  ];

  const inventoryMap: Record<string, string> = {};

  for (const item of inventoryData) {
    const created = await prisma.inventoryItem.upsert({
      where: { sku: item.sku },
      update: {
        physicalStock: item.physicalStock,
        reserveStock: item.reserveStock,
      },
      create: item,
    });
    inventoryMap[item.sku] = created.id;
  }

  console.log(`✓ Seeded ${inventoryData.length} inventory items (components + standalone)`);

  // 4. Seed Standalone Products
  const standaloneProducts = [
    {
      name: "Water Flosser",
      slug: "water-flosser",
      description: "Portable water flosser designed for effective cleaning between teeth.",
      price: 8500,
      imageUrl: "https://images.unsplash.com/photo-1559591937-e62fb330bc1f?w=600&auto=format&fit=crop&q=80",
      categoryId: standaloneCategory.id,
      inventoryItemId: inventoryMap["STN-WF-01"],
      showExactStock: true,
    },
    {
      name: "Sonic Electric Toothbrush",
      slug: "electric-toothbrush",
      description: "Rechargeable electric toothbrush with multiple cleaning modes.",
      price: 6000,
      imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
      categoryId: standaloneCategory.id,
      inventoryItemId: inventoryMap["STN-ETB-01"],
      showExactStock: true,
    },
    {
      name: "Large Mouthwash Pack",
      slug: "large-mouthwash-pack",
      description: "Family size antiseptic mouthwash for daily gum protection.",
      price: 1200,
      imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
      categoryId: standaloneCategory.id,
      inventoryItemId: inventoryMap["STN-LMW-01"],
      showExactStock: true,
    },
  ];

  for (const prod of standaloneProducts) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: { price: prod.price },
      create: prod,
    });
  }

  console.log(`✓ Seeded ${standaloneProducts.length} standalone retail products`);

  // 5. Seed Packages & Recipes
  // Package A: General Dental Care Package
  const generalPackage = await prisma.package.upsert({
    where: { slug: "general-dental-care-package" },
    update: {
      price: 2500,
      assembledStock: 10,
    },
    create: {
      name: "General Dental Care Package",
      slug: "general-dental-care-package",
      description: "A complete collection of essential daily dental-care products.",
      price: 2500,
      imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=80",
      categoryId: generalCategory.id,
      assembledStock: 10,
      showExactStock: true,
    },
  });

  // Package A Recipe Components: Toothbrush x 3, Dental Floss x 2, Floss Threader x 1, Mouthwash x 1
  const generalComponents = [
    { inventoryItemId: inventoryMap["COMP-TB-01"], quantity: 3 },
    { inventoryItemId: inventoryMap["COMP-DF-01"], quantity: 2 },
    { inventoryItemId: inventoryMap["COMP-FT-01"], quantity: 1 },
    { inventoryItemId: inventoryMap["COMP-MW-01"], quantity: 1 },
  ];

  for (const comp of generalComponents) {
    await prisma.packageItem.upsert({
      where: {
        packageId_inventoryItemId: {
          packageId: generalPackage.id,
          inventoryItemId: comp.inventoryItemId,
        },
      },
      update: { quantity: comp.quantity },
      create: {
        packageId: generalPackage.id,
        inventoryItemId: comp.inventoryItemId,
        quantity: comp.quantity,
      },
    });
  }

  // Package B: Braces Care Package
  const bracesPackage = await prisma.package.upsert({
    where: { slug: "braces-care-package" },
    update: {
      price: 3500,
      assembledStock: 8,
    },
    create: {
      name: "Braces Care Package",
      slug: "braces-care-package",
      description: "Specialized orthodontic care package for patients with braces.",
      price: 3500,
      imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&auto=format&fit=crop&q=80",
      categoryId: bracesCategory.id,
      assembledStock: 8,
      showExactStock: true,
    },
  });

  // Package B Recipe Components: Orthodontic Toothbrush x 3, Orthodontic Floss x 2, Floss Threader x 1, Orthodontic Wax x 1
  const bracesComponents = [
    { inventoryItemId: inventoryMap["COMP-OTB-01"], quantity: 3 },
    { inventoryItemId: inventoryMap["COMP-OF-01"], quantity: 2 },
    { inventoryItemId: inventoryMap["COMP-FT-01"], quantity: 1 },
    { inventoryItemId: inventoryMap["COMP-OW-01"], quantity: 1 },
  ];

  for (const comp of bracesComponents) {
    await prisma.packageItem.upsert({
      where: {
        packageId_inventoryItemId: {
          packageId: bracesPackage.id,
          inventoryItemId: comp.inventoryItemId,
        },
      },
      update: { quantity: comp.quantity },
      create: {
        packageId: bracesPackage.id,
        inventoryItemId: comp.inventoryItemId,
        quantity: comp.quantity,
      },
    });
  }

  console.log("✓ Seeded Dental-Care Packages and recipe items");
  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
